import { useCallback, useEffect, useState } from "react";
import { fetchGroupsData } from "@/apis/tripGroupsApi";
import { shareInviteLink } from "@/utils/kakaoShare";
import { getStoredJson } from "@/utils/getStorage";

const GROUP_NOT_READY_TEXT = "모든 친구가 입력해야 시작할 수 있어요";
const GROUP_MEMBER_READY_TEXT = "방장만 AI 분석을 시작할 수 있어요";
const GROUP_LEADER_READY_TEXT = "AI 분석 시작하기";
export const GROUP_ERROR_TEXT = "에러가 발생하였습니다. 콘솔을 확인해주세요.";

function isMemberSurveyCompleted(member) {
    if (member.surveyCompleted === true) return true;
    return false;
}

export function useGroup() {
    const user = getStoredJson("groupMember");
    const group = getStoredJson("tripGroup");
    // 초대 코드가 없는 경우 주소창의 초대 코드 사용, 없으면 로컬 스토리지의 초대 코드 사용
    // 현재는 테스트 초대코드 사용 (추후 삭제)
    const inviteCode = new URLSearchParams(window.location.search).get("inviteCode") ?? "test1234abcd"; 
    const tripGroupId = group?.tripGroupId ?? group?.id ?? null; 

    const [groupInfo, setGroupInfo] = useState(null);
    const [memberList, setMemberList] = useState(null);
    const [isToNext, setIsToNext] = useState(false);
    const [nextButtonText, setNextButtonText] = useState(GROUP_NOT_READY_TEXT);

    useEffect(() => {
        if (groupInfo && groupInfo.status === "VOTING") {
            console.log("그룹 상태가 VOTING이 되어 폴링을 중단합니다.");
            return;
        }

        const loadGroupData = async () => {
            if (tripGroupId == null) {
                console.error("로컬 스토리지에 그룹 ID 정보가 존재하지 않습니다.");
                setNextButtonText(GROUP_ERROR_TEXT);
                return;
            }

            try {
                const result = await fetchGroupsData(tripGroupId, inviteCode);

                if (!result) {
                    setNextButtonText(GROUP_ERROR_TEXT);
                    return;
                }

                const { memberList: parsedMemberListData, groupInfo: parsedInvitedGroupData } = result;

                setGroupInfo(parsedInvitedGroupData);
                setMemberList(parsedMemberListData);

                const allSurveyCompleted =
                    parsedMemberListData.length ===
                    parsedMemberListData.filter((member) => isMemberSurveyCompleted(member)).length;

                if (!allSurveyCompleted) {
                    setIsToNext(false);
                    setNextButtonText(GROUP_NOT_READY_TEXT);
                } else if (user?.role === "LEADER") {
                    setIsToNext(true);
                    setNextButtonText(GROUP_LEADER_READY_TEXT);
                } else {
                    setIsToNext(false);
                    setNextButtonText(GROUP_MEMBER_READY_TEXT);
                }

                console.log("그룹 데이터를 성공적으로 불러왔습니다");
                console.log("멤버 목록 조회 API 주소: ", `/api/v1/trip-groups/${tripGroupId}`);
                console.log("현재 멤버 목록:", parsedMemberListData);
                console.log("그룹 정보 조회 API 주소: ", `/api/v1/trip-groups/invite/${inviteCode}`);
                console.log("현재 그룹 정보:", parsedInvitedGroupData);
            } catch (error) {
                console.error("데이터를 실시간으로 갱신하는데 실패했습니다:", error);
            }
        };

        if (groupInfo === null) {
            loadGroupData();
        } else {
            const timer = setTimeout(loadGroupData, 3000);
            return () => clearTimeout(timer);
        }
    }, [groupInfo, inviteCode, tripGroupId, user?.role]);

    const isLoading = !groupInfo || !Array.isArray(memberList);

    const copyLink = useCallback(async () => {
        const targetUrl = `${window.location.origin}/invite/${inviteCode}`;
        try {
            await navigator.clipboard.writeText(targetUrl);
            alert("링크가 복사되었습니다.");
        } catch {
            alert("링크 복사에 실패했습니다.");
        }
    }, [inviteCode]);

    const shareKakao = useCallback(async () => {
        if (!inviteCode) {
            console.error("초대 코드가 없습니다.");
            return;
        }
        shareInviteLink({
            inviteCode,
            groupName: groupInfo?.name,
        });
    }, [inviteCode, groupInfo?.name]);

    const handleStartAnalysis = useCallback(() => {
        if (!isToNext) return;
        console.log("AI 분석 시작");
    }, [isToNext]);


    return {
        user,
        inviteCode,
        groupInfo,
        memberList,
        isToNext,
        nextButtonText,
        isLoading,
        copyLink,
        shareKakao,
        handleStartAnalysis,
    };
}
