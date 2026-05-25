import { instance } from '@/apis/instance';
import { normalizeGroupInfo, normalizeInvitePreview, normalizeMemberList } from '@/utils/tripGroupsApiUtil';

const type = ["memberList", "groupInfo"];

// 응답 데이터 형식 변환 (result 반환)
function convertResult(response, type) {
    const { isSuccess, result } = response.data ?? {};
    if (!isSuccess || result == null) {
        console.error(`${type} response 데이터가 없습니다.`);
        return null;
    }
    return result;
}

// 그룹 정보 조회
export async function fetchGroupsData(tripGroupId, inviteCode) {
    // tripGroupId나 inviteCode가 없는 경우 그룹 정보 및 멤버 목록 반환 불가
    if (tripGroupId === null) {
        console.error('tripGroupId가 필요합니다.');
        return null;
    } else if (inviteCode === null) {
        console.error('inviteCode가 필요합니다.');
        return null;
    }

    // 그룹 상세 정보 조회
    const groupResponse = await instance.get(`/api/v1/trip-groups/${tripGroupId}`);
    const groupResult = convertResult(groupResponse, "groupInfo");

    // 문자열 포맷팅에 따른 정규화 (그룹 정보)
    const groupInformation = normalizeGroupInfo(groupResult);
    // 문자열 포맷팅에 따른 정규화 (멤버 목록 정보)
    const memberList = normalizeMemberList(groupResult.members);

    // 그룹 정보 데이터 유효성 검증 (현재는 테스트 중으로 추후 추가)
    // if (groupInformation.tripGroupId !== tripGroupId) {
    //     console.error('그룹 정보의 tripGroupId가 일치하지 않습니다.', groupInformation);
    //     return null;
    // } else if (groupInformation.inviteCode !== inviteCode) {
    //     console.error('그룹 정보의 초대 코드가 일치하지 않습니다.', groupInformation);
    //     return null;
    // } 

    // 초대 그룹 정보 조회 (API 명세서와 의도가 맞지 않아 보류중)
    // const inviteResponse = await instance.get(`/api/v1/trip-groups/invite/${inviteCode}`);
    // const inviteResult = convertResult(inviteResponse, "groupInfo");

    // 문자열 포맷팅에 따른 정규화 (초대 그룹 정보)
    // const groupInfo = normalizeInvitePreview(inviteResult);

    const groupInfo = {
        name: groupInformation.name,
        tripLength: groupInformation.tripLength,
        startDate: groupInformation.startDate,
        endDate: groupInformation.endDate,
    };

    // 객체 반환
    return { memberList, groupInfo };
}
