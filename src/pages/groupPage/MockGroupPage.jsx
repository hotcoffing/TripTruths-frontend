import style from "./GroupPage.module.scss";
import GroupHeader from "./components/GroupHeader";
import GroupInvite from "./components/GroupInvite";
import GroupInputProgress from "./components/GroupInputProgress";
import Button from "@/components/common/Button";
import { useEffect, useState } from "react";
import { shareInviteLink } from "@/utils/kakaoShare";

// 아래 객체·상수를 수정하며 화면·버튼 상태를 확인 (기본: 모두 완료 / 방장)
const MOCK_INVITE_CODE = "TEST-INVITE-CODE";

const MOCK_GROUP_INFO = {
    tripGroupId: 1,
    name: "여름 여행",
    tripLength: "ONE_NIGHT",
    startDate: "2026-08-07",
    endDate: "2026-08-08",
    status: "GATHERING",
};

const MOCK_MEMBER_LIST = [
    {
        memberId: 1,
        tripGroupId: 1,
        nickname: "수민",
        role: "LEADER",
        surveyCompleted: false,
    },
    {
        memberId: 2,
        tripGroupId: 1,
        nickname: "지훈",
        role: "MEMBER",
        surveyCompleted: true,
    },
    {
        memberId: 3,
        tripGroupId: 1,
        nickname: "민지",
        role: "MEMBER",
        surveyCompleted: true,
    },
    {
        memberId: 4,
        tripGroupId: 1,
        nickname: "서영",
        role: "MEMBER",
        surveyCompleted: true,
    },
];

const MOCK_USER = {
    memberId: 1,
    tripGroupId: 1,
    nickname: "수민",
    role: "LEADER",
    surveyCompleted: false,
};

function isMemberSurveyCompleted(member) {
    return member.surveyCompleted === true;
}

function seedMockLocalStorage() {
    localStorage.setItem("groupMember", JSON.stringify(MOCK_USER));
    localStorage.setItem("tripGroup", JSON.stringify(MOCK_GROUP_INFO));
}

function MockGroupPage() {
    const groupNotReadyText = "모든 친구가 입력해야 시작할 수 있어요";
    const groupMemberReadyText = "방장만 AI 분석을 시작할 수 있어요";
    const groupLeaderReadyText = "AI 분석 시작하기";

    // GroupPage와 동일: URL 쿼리 inviteCode, 없으면 MOCK_INVITE_CODE
    const inviteCode =
        new URLSearchParams(window.location.search).get("inviteCode") ??
        MOCK_INVITE_CODE;

    const [groupInfo] = useState(MOCK_GROUP_INFO);
    const [memberList] = useState(MOCK_MEMBER_LIST);
    const [user, setUser] = useState(null);

    useEffect(() => {
        seedMockLocalStorage();
        setUser(MOCK_USER);
    }, []);

    const allSurveyCompleted =
        memberList.length > 0 &&
        memberList.every((member) => isMemberSurveyCompleted(member));

    const isToNext = allSurveyCompleted && user?.role === "LEADER";

    const nextButtonText = (() => {
        if (!allSurveyCompleted) return groupNotReadyText;
        if (user?.role === "LEADER") return groupLeaderReadyText;
        return groupMemberReadyText;
    })();

    async function copyLink() {
        const targetUrl = `${window.location.origin}/invite/${inviteCode}`;
        try {
            await navigator.clipboard.writeText(targetUrl);
            alert("링크가 복사되었습니다.");
        } catch {
            alert("링크 복사에 실패했습니다.");
        }
    }

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

    if (!user) {
        return <div className={style['group-container']}>테스트 데이터를 준비하는 중입니다...</div>;
    }

    return (
        <div className={style['group-container']}>
            <GroupHeader
                groupName={groupInfo.name}
                tripLength={groupInfo.tripLength}
                startDate={groupInfo.startDate}
                endDate={groupInfo.endDate}
            />
            <GroupInvite
                handleCopyLink={copyLink}
                handleKakao={shareKakao}
            />
            <GroupInputProgress
                myId={user.memberId}
                memberList={memberList}
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

export default MockGroupPage;
