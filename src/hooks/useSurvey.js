import { useState } from 'react';

export function useSurvey() {
    // 현재 폼 출력 위치 변수
    const [nowForm, setNowForm] = useState("Q1");

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

    // 최대 선택 가능 지정 핸들러
    const handleButtonClick = (Obj, count) => {
        const isQ1 = nowForm === "Q1";
        const setter = isQ1 ? setQ1SelectedList : setQ2SelectedList;

        setter((prev) => {
            const isAlreadySelected = prev.some((item) => item.id === Obj.id);
            let updatedList;

            if (isAlreadySelected) {
                updatedList = prev.filter((item) => item.id !== Obj.id);
            } 
            else {
                if (prev.length >= count) {
                    return prev;
                } else {
                    updatedList = [...prev, Obj];
                }
            }

            setIsError(false);

            // 다음 버튼 활성화 여부 판단
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
        // API 전달 구현 필요

        // Q1, Q2 유효성 검사 (버튼 선택형)
        if (nowForm === "Q1" || nowForm === "Q2") {
            if (formData.length === 0) {
                setIsError(true);
                setIsToNext(false);
                return;
            }
        }

        // sessionStorage에 중간 저장 (추후 구현 고려)
        sessionStorage.setItem(`survey_${nowForm}`, JSON.stringify(formData));

        // 최종 제출 처리
        if (targetForm === "SUBMIT") {
            const finalData = {
                Q1: JSON.parse(sessionStorage.getItem("survey_Q1") || "[]"),
                Q2: JSON.parse(sessionStorage.getItem("survey_Q2") || "[]"),
                Q3: JSON.parse(sessionStorage.getItem("survey_Q3") || "{}"),
                Q4: JSON.parse(sessionStorage.getItem("survey_Q4") || "0"),
                Q5: formData // 현재 입력값 (q5Text)
            };
            console.log("=== 최종 설문 제출 데이터 ===");
            console.log(JSON.stringify(finalData, null, 2));
            alert("제출이 완료되었습니다! 콘솔을 확인해주세요.");
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