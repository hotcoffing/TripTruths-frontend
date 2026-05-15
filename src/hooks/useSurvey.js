import { useState } from 'react';

export function useSurvey() {
    // 현재 폼 출력 위치 변수
    const [nowForm, setNowForm] = useState("Q1");

    // 에러 검사 변수
    const [isError, setIsError] = useState(false);

    // 다음 버튼 활성화 변수
    const [isToNext, setIsToNext] = useState(false);

    // 텍스트박스 전용 상태 관리
    const [text, setText] = useState('');

    // 슬라이더 전용 상태 관리
    const [currentCharge, setCurrentCharge] = useState(0);

    // Q1 ~ Q2부분 선택된 버튼 상태 관리
    const [selectedList, setSelectedList] = useState([]);

    // 태그 버튼 선택 상태 관리
    const [selectedTags, setSelectedTags] = useState([]);

    

    // 최대 선택 가능 지정 핸들러
    // count는 최대 선택 가능 개수
    const handleButtonClick = (Obj, selectedList, count) => {
        setSelectedList((prev) => {
            // 이미 선택된 객체인지 id 비교
            const isAlreadySelected = prev.some((item) => item.id === Obj.id);
            let updatedList;

            // 이미 선택된 경우
            if (isAlreadySelected) {
                // 이미 있으면 해당 객체의 id를 제외하고 필터링
                updatedList = prev.filter((item) => item.id !== Obj.id);
                // 이후 절대 에러가 발생할 수 없으므로 초기화
                setIsError(false);
            } 
            // 선택지 않고 새로 선택된 경우
            else {
                if (prev.length >= count) {
                    // 버튼을 눌렀을때 최대 개수 제한이 되는 경우 에러 처리후 리턴
                    return prev;
                } else {
                    updatedList = [...prev, Obj];
                }
            }

            // 선택 후 최소 충족 조건 만족
            setIsError(false)

            // 유효성 검사 및 다음 버튼 활성화 여부 바로 갱신
            const validCount = updatedList.filter((item) => item.id.startsWith(nowForm)).length;
            setIsToNext(validCount > 0 && validCount <= count);

            return updatedList;
        });

        // 버튼을 1개 이상, count개 이하로 선택하였다면 다음 버튼 활성화
        const vaild = selectedList.filter(
            // Q1인지 Q2인지 구분해 현재 폼 type과 다른 객체는 필터링
            (item) => item.id.slice(0, 2) !== nowForm
        )
        if (vaild.length > 0 && vaild.length <= count) {
            setIsToNext(true)
        }
    };    

    // 태그 클릭 핸들러 (다중 선택 가능)
    const handleTagClick = (tag) => {
        setSelectedTags((prev) => {
            // 이미 선택된 태그인 경우 -> 제거
            if (prev.includes(tag)) {
                return prev.filter((t) => t !== tag);
            }

            // 새로 선택된 경우 -> 배열 뒤에 추가
            return [...prev, tag];
        });
    };

    // 다음 버튼을 누르는 경우의 데이터 제출 핸들러
    const handleSubmit = (targetForm, formData) => {
        // formData를 API로 전송하는 로직 구현 필요

        // 유효성 검사 변수 (선택된 버튼의 개수)
        const validItems = formData.filter((item) => item.id.startsWith(nowForm));
            
        // 아무것도 선택하지 않았을 때 에러 발생
        if (validItems.length === 0) {
            setIsError(true);
            return;
        }

        // 유효하다면 다음 폼으로 이동
        setIsError(false);
        setIsToNext(false); // 다음 폼을 위해 비활성화 초기화
        setNowForm(targetForm);
    };

    return {
        nowForm,
        isError,
        isToNext,
        selectedList,
        text, setText,
        currentCharge, setCurrentCharge,
        selectedTags,
        handleButtonClick,
        handleTagClick,
        handleSubmit
    };
}