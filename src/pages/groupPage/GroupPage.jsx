import style from "./GroupPage.module.scss"
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

// TODO: 서버 연동 완료 후 삭제
const MOCK_GROUP_INFO = {
    name: "제주도 여행",
    trip_length: 3,
    start_date: "2026-06-01",
    end_date: "2026-06-03",
    status: "SURVEY",
};

const MOCK_MEMBER_LIST = [
    { id: 1, nickname: "방장님", role: "leader", is_survey_complete: true },
    { id: 2, nickname: "민수", role: "member", is_survey_complete: true },
    { id: 3, nickname: "지연", role: "member", is_survey_complete: false },
];

// TODO: 서버 연동 완료 후 false로 변경
const IS_MOCK_MODE = true;

function GroupPage() {
    // 정적 텍스트 데이터 
    const groupNotReadyText = "모든 친구가 입력해야 시작할 수 있어요";
    const groupMemberReadyText = "방장만 AI 분석을 시작할 수 있어요";
    const groupLeaderReadyText = "AI 분석 시작하기";
    const groupErrorText = "그룹 정보를 찾을 수 없습니다.";

    // 로컬 스토리지에서 저장된 개인 사용자 정보 가져오기
    // 가져올 목록 : 현재 사용자 정보, 초대코드

    // group_member 테이블의 객체 전체를 로컬 스토리지에서 가져옴
    const user = JSON.parse(localStorage.getItem("user"));       
    // 그룹 초대 코드도 로컬 스토리지에서 가져옴
    const inviteCode = JSON.parse(localStorage.getItem("inviteCode"));       

    // group_member 테이블 내부의 그룹 ID 외래키
    // ?. 로 안전하게 데이터 가져오기
    const userGroupId = user?.trip_group_id;        

    // API 데이터 가져오기
    // 가져올 목록 : 그룹 정보, 사용자 목록 정보 
    // 현재는 임시 데이터 사용
    const [groupInfo, setGroupInfo] = useState(MOCK_GROUP_INFO);
    const [memberList, setMemberList] = useState(MOCK_MEMBER_LIST);

    const allSurveyCompleted =
        MOCK_MEMBER_LIST.length ===
        MOCK_MEMBER_LIST.filter((member) => member.is_survey_complete).length;

    // 하단 버튼 활성화 상태
    const [isToNext, setIsToNext] = useState(
        allSurveyCompleted && user?.role === "leader"
    );

    // 하단 버튼 텍스트 데이터 상태
    const [nextButtonText, setNextButtonText] = useState(() => {
        if (!allSurveyCompleted) return groupNotReadyText;
        if (user?.role === "leader") return groupLeaderReadyText;
        return groupMemberReadyText;
    });

    useEffect(() => {
        if (IS_MOCK_MODE) return;

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

                // 받아온 데이터 상태 저장
                setGroupInfo(groupResponse.data);
                setMemberList(memberListResponse.data);

                // 임시 데이터 저장
                const freshMemberList = memberListResponse.data;

                const allSurveyCompleted = freshMemberList.length === freshMemberList.filter(
                    (member) => member.is_survey_complete
                ).length;

                // 버튼 상태 결정
                if (!allSurveyCompleted) {
                    // 아직 설문 안 끝난 사용자가 있을 때
                    setIsToNext(false);
                    setNextButtonText(groupNotReadyText);
                } else if (user?.role === 'leader') {
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

    if (!groupInfo || !memberList) {
        return <div className={style['group-container']}>데이터를 불러오는 중입니다...</div>;
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
                    onClick={() => handleIsNext("Q2", nowSelectedList, nextSelectedList)}
                />
            </div>
        </div>
    );
}

export default GroupPage;