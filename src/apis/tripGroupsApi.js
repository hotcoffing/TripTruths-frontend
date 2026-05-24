import { instance } from '@/apis/instance';

function unwrapResult(response) {
    const { isSuccess, result } = response.data ?? {};
    if (!isSuccess || result == null) {
        return null;
    }
    return result;
}

function normalizeGroupInfo(result) {
    const tripLength = result.tripLength ?? result.trip_length;
    if (result.name == null || tripLength == null || result.status == null) {
        return null;
    }

    return {
        id: result.tripGroupId ?? result.id,
        name: result.name,
        tripLength,
        startDate: result.startDate ?? result.start_date ?? null,
        endDate: result.endDate ?? result.end_date ?? null,
        inviteCode: result.inviteCode ?? result.invite_code,
        status: result.status,
        totalMembers: result.totalMembers ?? result.total_members,
        completedMembers: result.completedMembers ?? result.completed_members,
    };
}

function normalizeInvitePreview(result) {
    const tripLength = result.tripLength ?? result.trip_length;
    if (result.name == null || tripLength == null) {
        return null;
    }

    return {
        name: result.name,
        tripLength,
        startDate: result.startDate ?? result.start_date ?? null,
        endDate: result.endDate ?? result.end_date ?? null,
    };
}

function normalizeMember(member) {
    const memberId = member.memberId ?? member.id;
    if (memberId == null) return null;

    return {
        memberId,
        nickname: member.nickname,
        role: member.role,
        surveyCompleted:
            member.surveyCompleted ??
            member.is_survey_completed ??
            member.isSurveyCompleted ??
            false,
    };
}

function normalizeMemberList(members) {
    if (!Array.isArray(members)) return null;
    return members.map(normalizeMember).filter(Boolean);
}

/** @returns {{ groupInfo: object, memberList: object[] } | null} */
export async function fetchGroupsData(inviteCode, tripGroupId) {
    if (tripGroupId != null) {
        const detailResponse = await instance.get(`/api/v1/trip-groups/${tripGroupId}`);
        const detailResult = unwrapResult(detailResponse);

        if (!detailResult) {
            console.error('그룹 상세 응답 형식이 올바르지 않습니다.', detailResponse.data);
            return null;
        }

        const groupInfo = normalizeGroupInfo(detailResult);
        const memberList = normalizeMemberList(detailResult.members);

        if (!groupInfo) {
            console.error('그룹 정보 형식이 올바르지 않습니다.', detailResult);
            return null;
        }
        if (memberList === null) {
            console.error('멤버 목록 정보 형식이 올바르지 않습니다.', detailResult);
            return null;
        }

        return { groupInfo, memberList };
    }

    if (!inviteCode) {
        console.error('inviteCode 또는 tripGroupId가 필요합니다.');
        return null;
    }

    const inviteResponse = await instance.get(`/api/v1/trip-groups/invite/${inviteCode}`);
    const inviteResult = unwrapResult(inviteResponse);

    if (!inviteResult) {
        console.error('초대 정보 응답 형식이 올바르지 않습니다.', inviteResponse.data);
        return null;
    }

    const groupInfo = normalizeInvitePreview(inviteResult);
    if (!groupInfo) {
        console.error('초대 그룹 정보 형식이 올바르지 않습니다.', inviteResult);
        return null;
    }

    return { groupInfo, memberList: [] };
}
