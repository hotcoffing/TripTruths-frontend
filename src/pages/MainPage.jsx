import { useEffect } from "react";

const MOCK_INVITE_CODE = "TEST-INVITE-CODE";

/** trip-groups API / useGroup 에서 사용하는 그룹 컨텍스트 */
const MOCK_TRIP_GROUP = {
    id: 1,
    name: "여름 여행",
    tripLength: "ONE_NIGHT",
    startDate: "2026-08-07",
    endDate: "2026-08-08",
    inviteCode: MOCK_INVITE_CODE,
    status: "GATHERING",
    totalMembers: 4,
    completedMembers: 3,
};

/** group_member(현재 로그인 멤버) — members 항목과 동일한 camelCase */
const MOCK_GROUP_MEMBER = {
    memberId: 1,
    tripGroupId: 2,
    nickname: "수민",
    role: "LEADER",
    surveyCompleted: true,
};

function seedGroupMockToLocalStorage() {
    localStorage.setItem("tripGroup", JSON.stringify(MOCK_TRIP_GROUP));
    localStorage.setItem("groupMember", JSON.stringify(MOCK_GROUP_MEMBER));
}

const MainPage = () => {
    useEffect(() => {
        seedGroupMockToLocalStorage();
    }, []);

    return <div>MainPage</div>;
};

export default MainPage;
