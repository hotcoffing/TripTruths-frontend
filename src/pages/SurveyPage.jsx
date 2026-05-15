// 리액트, 스타일
import React, { useState } from 'react';
import styles from './SurveyPage.module.scss';

// 컴포넌트
import Button from '../components/SurveyButton';
import SurveyInfo from '../components/SurveyInfo';
import SurveyTextBox from '../components/SurveyTextBox';
import SurveySlider from '../components/SurveySlider';
import Q1Form from '../components/Q1Form';

// 커스텀 훅
import { useSurvey } from '../hooks/useSurvey';

// 정적 데이터
// Q1 ~ Q2부분 버튼 전체 배열
const allSelectButton = [
    { id: "Q1_1", content: "🏃 엑티비티" },
    { id: "Q1_2", content: "🌴 휴양" },
    { id: "Q1_3", content: "🏛 문화/관광" },
    { id: "Q1_4", content: "🍽️ 맛집" },
    { id: "Q1_5", content: "📸 감성/사진" },
    { id: "Q1_6", content: "🎡 놀거리" },
    { id: "Q2_1", content: "🌊 바다" },
    { id: "Q2_2", content: "⛰️ 산/자연" },
    { id: "Q2_3", content: "🏙️ 도시 탐험" },
    { id: "Q2_4", content: "☕ 카페 투어" },
    { id: "Q2_5", content: "🛍️ 쇼핑" },
    { id: "Q2_6", content: "🌃 야경" },
];

// 추후 태그 결정에 API 데이터를 받는지 정적데이터로 사용하는지 확인 필요
const tags = [
    "새벽 출발", "비행기", "등산", "과음", 
    "멀미", "매운 음식", "벌레", "장거리 이동"
];

// ==========================================================================

function SurveyPage() {
    const {
        nowForm,
        isError,
        isToNext,
        text,
        currentCharge,
        selectedList,
        selectedTags,
        handleButtonClick,
        handleSubmit
    } = useSurvey();

    // 폼 렌더링
    const renderForm = () => {
        switch (nowForm) {
            case "Q1":
                return (<Q1Form
                    isError={isError} 
                    isToNext={isToNext}
                    selectList={allSelectButton.filter((item) => item.id.startsWith("Q1"))} 
                    nowSelectedList={selectedList} 
                    handleSelect={handleButtonClick} 
                    handleIsNext={handleSubmit} 
                />);
                break;
            case "Q2": return(<div>form2</div>); break;
            case "Q3": return(<div>form3</div>); break;
            case "Q4": return(<div>form4</div>); break;
            case "Q5": return(<div>form5</div>); break;

            default:
                return <div>페이지를 찾을 수 없습니다.</div>;
        }
    }

    return (
        <div>
            {renderForm()}
        </div>
    );
};

export default SurveyPage;