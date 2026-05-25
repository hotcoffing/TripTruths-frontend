import { useState } from 'react';
import { setStoredJson } from '@/utils/setStorage';
import { getStoredJson } from '@/utils/getStorage';
import { postSurveyData } from '@/apis/tripSurveysApi';
import {
    ACTIVITY_TYPE_BY_OPTION_ID,
    MOOD_TYPE_BY_OPTION_ID,
} from '@/constants/surveyOptions';
import { SURVEY_FORM_NAME } from '@/constants/surveyFormName';
import { STORAGE_KEY } from '@/constants/storageKey';

// Q4 슬라이더 값 → N * 10000 원 형식
function formatBudget(manWon) {
    const amount = parseInt(manWon) * 10000;
    return amount.toString();
}

// API 제출 body
function buildSurveySubmit(comment) {
    // 로컬 스토리지에 저장된 설문 데이터 조회
    const q1Selections = getStoredJson(STORAGE_KEY.SURVEY_FORM(SURVEY_FORM_NAME.Q1)) ?? [];
    const q2Selections = getStoredJson(STORAGE_KEY.SURVEY_FORM(SURVEY_FORM_NAME.Q2)) ?? [];
    const q3 = getStoredJson(STORAGE_KEY.SURVEY_FORM(SURVEY_FORM_NAME.Q3)) ?? { text: '', selectedTags: [] };
    const q4 = getStoredJson(STORAGE_KEY.SURVEY_FORM(SURVEY_FORM_NAME.Q4)) ?? 10;

    const moods = q1Selections
        .map((item) => MOOD_TYPE_BY_OPTION_ID[item.id])
        .filter(Boolean);

    const activities = q2Selections
        .map((item) => ACTIVITY_TYPE_BY_OPTION_ID[item.id])
        .filter(Boolean);

    // API 제출 body 반환
    return {
        moods,
        activities,
        avoidanceText: q3.text ?? '',
        avoidanceTags: Array.isArray(q3.selectedTags) ? q3.selectedTags : [],
        budget: formatBudget(q4),
        comment: comment ?? '',
    };
}

export function useSurvey() {
    // 현재 폼 출력 위치 변수
    const [nowForm, setNowForm] = useState(SURVEY_FORM_NAME.Q1);

    // 에러 검사 변수
    const [isError, setIsError] = useState(false);

    // 다음 버튼 활성화 변수
    const [isToNext, setIsToNext] = useState(false);

    // 텍스트박스 전용 상태 관리 (Q3, Q5 분리)
    const [q3Text, setQ3Text] = useState('');
    const [q5Text, setQ5Text] = useState('');

    // 슬라이더 전용 상태 관리 (초기값 10)
    const [currentCharge, setCurrentCharge] = useState(10);

    // Q1 답변 선택 상태 관리
    const [q1SelectedList, setQ1SelectedList] = useState([]);
    // Q2 답변 선택 상태 관리
    const [q2SelectedList, setQ2SelectedList] = useState([]);

    // 태그 버튼 선택 상태 관리
    const [selectedTags, setSelectedTags] = useState([]);

    // 최대 Q1, Q2 버튼 리스트 선택 핸들러
    const handleButtonClick = (Obj, count) => {
        const isQ1 = nowForm === SURVEY_FORM_NAME.Q1;
        const setter = isQ1 ? setQ1SelectedList : setQ2SelectedList;

        setter((prev) => {
            const isAlreadySelected = prev.some((item) => item.id === Obj.id);
            let updatedList;

            // 이미 선택된 경우 해당 버튼 제거
            if (isAlreadySelected) {
                updatedList = prev.filter((item) => item.id !== Obj.id);
            } 
            // 선택되지 않은 경우 버튼 추가
            else { 
                // 최대 선택 가능 개수 초과 시 추가 불가
                if (prev.length >= count) {
                    return prev;
                } else {
                    // 최대 선택 가능 개수 이하인 경우 버튼 추가
                    updatedList = [...prev, Obj];
                }
            }

            // 선택 시 논리적으로 에러 상태 초기화
            setIsError(false);

            // 다음 버튼 활성화 여부 판단 (선택된 버튼이 있는 경우 활성화)
            setIsToNext(updatedList.length > 0);

            return updatedList;
        });
    };    

    // 태그 클릭 핸들러 (다중 선택 가능)
    const handleTagClick = (tag) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag);
            }
            return [...prev, tag];
        });
    };

    // 이전 버튼을 누르는 경우의 핸들러
    const handlePrev = (targetForm) => {
        setNowForm(targetForm);
        setIsError(false);
        setIsToNext(true);
    };

    // 다음 버튼을 누르는 경우의 데이터 제출 핸들러 (다음 버튼)
    const handleSubmit = (targetForm, formData, nextFormData = null) => {
        // Q1, Q2 유효성 검사 (버튼 선택형) : 선택된 버튼이 없는 경우 에러 처리
        if (nowForm === SURVEY_FORM_NAME.Q1 || nowForm === SURVEY_FORM_NAME.Q2) {
            if (formData.length === 0) {
                setIsError(true);
                setIsToNext(false);
                return;
            }
        }

        // 로컬 스토리지에 중간 저장 (설문 데이터 저장)
        setStoredJson(STORAGE_KEY.SURVEY_FORM(nowForm), formData);

        // Q5에서는 최종 제출 처리 후 페이지 이동 (설문 데이터 제출)
        if (targetForm === SURVEY_FORM_NAME.SUBMIT) {
            // API 제출 body 생성
            const submitResult = buildSurveySubmit(formData);

            // API 제출
            postSurveyData(submitResult);

            // 페이지 이동 (추후 구현)
            // navigate('/survey/result');
            
            return;
        }

        // 유효하다면 다음 폼으로 이동
        setNowForm(targetForm);
        setIsError(false);

        // 현재는 구조상 하드코딩으로 설정 (추후 프로젝트 구조의 사용자 흐름이 변경되지 않는한 무조건 고정)
        if (nextFormData && nextFormData.length === 0) {
            setIsToNext(false);
        }
    };

    return {
        nowForm,
        isError,
        isToNext,
        q1SelectedList,
        q2SelectedList,
        q3Text, setQ3Text,
        q5Text, setQ5Text,
        currentCharge, setCurrentCharge,
        selectedTags,
        handleButtonClick,
        handleTagClick,
        handlePrev,
        handleSubmit
    };
}