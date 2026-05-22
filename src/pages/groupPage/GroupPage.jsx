import style from "./GroupPage.module.scss";
import GroupHeader from "./components/GroupHeader";
import GroupInvite from "./components/GroupInvite";
import GroupInputProgress from "./components/GroupInputProgress";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { instance } from '@/apis/instance';

// 추후 API 확정 후 구현 예정
function copyLink() {

}

function shareKakao() {

}

// API 응답이 group_member 배열 또는 trip_group + 목록 필드일 수 있음
function extractMemberList(data) {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.group_members)) return data.group_members;
    if (Array.isArray(data?.members)) return data.members;
    if (Array.isArray(data?.member_list)) return data.member_list;
    return null;
}

function readStoredJson(key) {
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

function extractGroupInfo(data) {
    if (!data || Array.isArray(data)) return null;
    if (data.name != null || data.trip_length != null || data.status != null) {
        return data;
    }
    return null;
}

function GroupPage() {
    // 정적 텍스트 데이터 
    const groupNotReadyText = "모든 친구가 입력해야 시작할 수 있어요";
    const groupMemberReadyText = "방장만 AI 분석을 시작할 수 있어요";
    const groupLeaderReadyText = "AI 분석 시작하기";
    const groupErrorText = "그룹 정보를 찾을 수 없습니다.";

    // 로컬 스토리지에서 저장된 개인 사용자 정보 가져오기
    // 가져올 목록 : 현재 사용자 정보, 초대코드

    // group_member 테이블의 객체 전체를 로컬 스토리지에서 가져옴
    const user = readStoredJson("user");
    // 그룹 초대 코드도 로컬 스토리지에서 가져옴
    const inviteCode = readStoredJson("inviteCode");

    // group_member 테이블 내부의 그룹 ID 외래키
    // ?. 로 안전하게 데이터 가져오기
    const userGroupId = user?.trip_group_id;        

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
            if (!userGroupId) {
                console.error('로컬 스토리지에 그룹 ID 정보가 존재하지 않습니다.');
                setNextButtonText(groupErrorText);
                return;
            }

            try {
                // Promise.all을 사용하여 두 API 요청을 동시에 보냄
                const [groupResponse, memberListResponse] = await Promise.all([
                    // API 명세서가 나오면 엔드포인트 설정
                    instance.get(`/api/v1/trip-groups/invite/${inviteCode}`),
                    instance.get(`/api/v1/trip-groups/${userGroupId}`)
                ]);

                const inviteData = groupResponse.data;
                const groupDetailData = memberListResponse.data;

                const parsedGroupInfo =
                    extractGroupInfo(inviteData) ?? extractGroupInfo(groupDetailData);
                const parsedMemberList =
                    extractMemberList(groupDetailData) ?? extractMemberList(inviteData);

                if (!parsedGroupInfo || !parsedMemberList) {
                    console.error('그룹/멤버 응답 형식이 올바르지 않습니다.', {
                        inviteData,
                        groupDetailData,
                    });
                    setNextButtonText(groupErrorText);
                    return;
                }

                // 받아온 데이터 상태 저장
                setGroupInfo(parsedGroupInfo);
                setMemberList(parsedMemberList);

                const freshMemberList = parsedMemberList;

                const allSurveyCompleted = freshMemberList.length === freshMemberList.filter(
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
