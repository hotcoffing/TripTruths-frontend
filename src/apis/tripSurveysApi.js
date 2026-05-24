import { instance } from "@/apis/instance";
import { getStoredJson } from "@/utils/getStorage";

export async function postSurveyData(surveyData) {
    const memberId = getStoredJson("groupMember").memberId;
    const tripGroupId = getStoredJson("tripGroup").id;
    const url = `/api/v1/trip-groups/${tripGroupId}/members/${memberId}/surveys`;
    
    try {
        console.log(url, surveyData);
        const response = await instance.post(url, JSON.stringify(surveyData, null, 2));
        return response.data;
    } catch (error) {
        console.error("설문 제출 실패:", error);
        return null;
    }
}