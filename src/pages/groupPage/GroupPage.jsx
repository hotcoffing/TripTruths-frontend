import style from "./GroupPage.module.scss";
import GroupHeader from "./components/GroupHeader";
import GroupInvite from "./components/GroupInvite";
import GroupInputProgress from "./components/GroupInputProgress";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { instance } from '@/apis/instance';
import { shareInviteLink } from "@/utils/kakaoShare";

// API 응답 변환기
// 멤버 목록 정보 변환기 (배열 반환환)
function extractMemberList(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.group_members)) return data.group_members;
    if (Array.isArray(data?.members)) return data.members;
    if (Array.isArray(data?.member_list)) return data.member_list;
    return null;
}

// 그룹 정보 변환기 (객체 반환)
function extractInviteData(data) {
    if (data.name != null && data.trip_length != null && data.status != null) {
        return data;
    }
    return null;
}

// 로컬 스토리지에서 데이터 가져오기
function getStoredJson(key) {
    try {
        const raw = localStorage.getItem(key);
        if (raw == null) return null;
        return JSON.parse(raw);
    } catch {
        console.error(`localStorage "${key}" JSON 파싱에 실패했습니다.`);
        return null;
    }
}

// 유효성 검사 함수 (API 응답 형식 대응)
function isMemberSurveyCompleted(member) {
    if (member.is_survey_completed === true) {
        return true;
    }
    if (member.isSurveyCompleted === true) {
        return true;
    }
    return false;
}

function GroupPage() {
    // 정적 텍스트 데이터 
    const groupNotReadyText = "모든 친구가 입력해야 시작할 수 있어요";
    const groupMemberReadyText = "방장만 AI 분석을 시작할 수 있어요";
    const groupLeaderReadyText = "AI 분석 시작하기";
    const groupErrorText = "에러가 발생하였습니다. 콘솔을 확인해주세요.";

    // 로컬 스토리지에서 저장된 개인 사용자 정보 가져오기
    // 가져올 목록 : 현재 사용자 정보, 초대코드

    // group_member 테이블의 객체 전체를 로컬 스토리지에서 가져옴
    const user = getStoredJson("group_member");

    // trip_group 테이블의 객체 전체를 로컬 스토리지에서 가져옴
    const group = getStoredJson("trip_group");

    // URL 파라미터로 초대 코드 가져오기
    const inviteCode = new URLSearchParams(window.location.search).get("inviteCode");

    // 로컬 스토리지에서 받아온 그룹 정보 중 그룹 ID 가져오기 
    const tripGroupId = group?.id;

    // API 데이터 가져오기
    // 가져올 목록 : 그룹 정보, 사용자 목록 정보 
    const [groupInfo, setGroupInfo] = useState(null);
    const [memberList, setMemberList] = useState(null);

    // 하단 버튼 활성화 상태
    const [isToNext, setIsToNext] = useState(false);

    // 하단 버튼 텍스트 데이터 상태
    const [nextButtonText, setNextButtonText] = useState(groupNotReadyText);

    useEffect(() => {
        // 벡엔드 요구사항 : 그룹 상태가 'VOTING'이 되면 더 이상 호출 X
        if (groupInfo && groupInfo.status === 'VOTING') {
            console.log('그룹 상태가 VOTING이 되어 폴링을 중단합니다.');
            return;
        }

        const fetchAllData = async () => {
            if (!tripGroupId) {
                console.error('로컬 스토리지에 그룹 ID 정보가 존재하지 않습니다.');
                setNextButtonText(groupErrorText);
                return;
            }

            try {
                // Promise.all을 사용하여 두 API 요청을 동시에 보냄
                const [groupResponse, memberListResponse] = await Promise.all([
                    // API 명세서가 확실하게 나오면 엔드포인트 설정 필요
                    instance.get(`/api/v1/trip-groups/invite/${inviteCode}`),
                    instance.get(`/api/v1/trip-groups/${tripGroupId}`)
                ]);


                // 그룹 정보 받아오기
                const groupInviteData = groupResponse.data;
                // 그룹 멤버 목록 정보 받아오기
                const groupMemberListData = memberListResponse.data;

                const parsedInviteData = extractInviteData(groupInviteData);
                const parsedMemberListData = extractMemberList(groupMemberListData);

                // 그룹 정보, 멤버 목록 정보 응답 형식 검증 에러 처리
                if (!parsedInviteData && !parsedMemberListData) {
                    console.error('그룹 정보, 멤버 목록 정보 모두 응답 형식이 올바르지 않습니다.', {
                        groupInviteData,
                        groupMemberListData,
                    });
                    setNextButtonText(groupErrorText);
                    return;
                } else if (!parsedInviteData) {
                    console.error('그룹 정보 형식이 올바르지 않습니다.', {
                        groupInviteData,
                        groupMemberListData,
                    });
                    setNextButtonText(groupErrorText);
                    return;
                } else if (!parsedMemberListData) {
                    console.error('멤버 목록 정보 형식이 올바르지 않습니다.', {
                        groupInviteData,
                        groupMemberListData,
                    });
                    setNextButtonText(groupErrorText);
                    return;
                }

                // 받아온 데이터 상태 저장
                setGroupInfo(parsedInviteData);
                setMemberList(parsedMemberListData);

                const allSurveyCompleted = parsedMemberListData.length === parsedMemberListData.filter(
                    (member) => isMemberSurveyCompleted(member)
                ).length;

                // 버튼 상태 결정
                if (!allSurveyCompleted) {
                    // 아직 설문 안 끝난 사용자가 있을 때
                    setIsToNext(false);
                    setNextButtonText(groupNotReadyText);
                } else if (user?.role === "LEADER") {
                    // 설문이 다 끝났고, 본인이 방장일 때
                    setIsToNext(true);
                    setNextButtonText(groupLeaderReadyText);
                } else {
                    // 설문이 다 끝났는데, 본인이 일반 사용자일 때
                    setIsToNext(false);
                    setNextButtonText(groupMemberReadyText);
                }
            } catch (error) {
                // API 명세서가 나오면 에러 코드 설정
                console.error('데이터를 실시간으로 갱신하는데 실패했습니다:', error);
            }
        };

        // 최초 진입 시 즉시 호출, 이후 3초마다 호출
        if (groupInfo === null) {
            fetchAllData();
        } else {
            const timer = setTimeout(fetchAllData, 3000);
            return () => clearTimeout(timer);
        }
    }, [groupInfo]);

    if (!groupInfo || !Array.isArray(memberList)) {
        return (
            <div className={style['group-container']}>
                {nextButtonText === groupErrorText
                    ? nextButtonText
                    : "데이터를 불러오는 중입니다..."}
            </div>
        );
    }

    // ============================== 공유 ==================================
    
    // 링크 복사
    async function copyLink() {
        const targetUrl = `${window.location.origin}/invite/${inviteCode}`;
        try {
            await navigator.clipboard.writeText(targetUrl);
            alert("링크가 복사되었습니다.");
        } catch {
            alert("링크 복사에 실패했습니다.");
        }
    }
        
    // 카카오톡 공유
    async function shareKakao() {
        if (!inviteCode) {
            console.error("초대 코드가 없습니다.");
            return;
        }
        shareInviteLink({
            inviteCode,
            groupName: groupInfo?.name,
        });
    }
    
    // ===================================================================

    return (
        <div className={style['group-container']}>
            <GroupHeader 
                groupName={groupInfo.name} 
                tripLength={groupInfo.trip_length} 
                startDate={groupInfo.start_date}
                endDate={groupInfo.end_date} 
            />
            <GroupInvite 
                handleCopyLink={copyLink}
                handleKakao={shareKakao}
            />
            <GroupInputProgress 
                myId={user?.id}
                memberList={memberList}
                // 모든 페이지 완성 시 구현 예정
                handleMovePage={() => {
                    console.log("survey 페이지로 이동");
                }}
            />
            <div className={style['next-button-container']}>      
                <Button
                    type="next-action"
                    size="md"
                    content={nextButtonText}
                    isActive={isToNext}
                    onClick={() => {
                        if (!isToNext) return;
                        console.log("AI 분석 시작");
                    }}
                />
            </div>
        </div>
    );
}

export default GroupPage;
