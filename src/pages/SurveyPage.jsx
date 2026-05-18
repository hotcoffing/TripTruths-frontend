// 리액트, 스타일
import style from './SurveyPage.module.scss';

// 컴포넌트
import SurveyProgressBar from '../components/feat/SurveyProgressBar';
import Q1Form from '../components/form/Q1Form';
import Q2Form from '../components/form/Q2Form';
import Q3Form from '../components/form/Q3Form';
import Q4Form from '../components/form/Q4Form';
import Q5Form from '../components/form/Q5Form';

// 커스텀 훅
import { useSurvey } from '../hooks/useSurvey';

// 정적 데이터
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

const tags = [
    "새벽 출발", "비행기", "등산", "과음", 
    "멀미", "매운 음식", "벌레", "장거리 이동"
];

function SurveyPage() {
    const {
        nowForm,
        isError,
        isToNext,
        q3Text, setQ3Text,
        q5Text, setQ5Text,
        currentCharge, setCurrentCharge,
        q1SelectedList,
        q2SelectedList,
        selectedTags,
        handleButtonClick,
        handleTagClick,
        handlePrev,
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
                    nowSelectedList={q1SelectedList} 
                    handleSelect={handleButtonClick} 
                    handleIsNext={handleSubmit} 
                />);
            case "Q2": 
                return (<Q2Form
                    isError={isError} 
                    isToNext={isToNext}
                    selectList={allSelectButton.filter((item) => item.id.startsWith("Q2"))} 
                    nowSelectedList={q2SelectedList} 
                    handleSelect={handleButtonClick} 
                    handleIsNext={handleSubmit} 
                    handlePrev={() => handlePrev("Q1")}
                />);
            case "Q3": 
                return (<Q3Form
                    text={q3Text}
                    setText={setQ3Text}
                    tags={tags}
                    selectedTags={selectedTags}
                    handleTagClick={handleTagClick}
                    handleIsNext={handleSubmit}
                    handlePrev={() => handlePrev("Q2")}
                />);
            case "Q4": 
                return (<Q4Form
                    currentCharge={currentCharge}
                    setCurrentCharge={setCurrentCharge}
                    handleIsNext={handleSubmit}
                    handlePrev={() => handlePrev("Q3")}
                />);
            case "Q5": 
                return (<Q5Form
                    text={q5Text}
                    setText={setQ5Text}
                    handleIsNext={handleSubmit}
                    handlePrev={() => handlePrev("Q4")}
                />);

            default:
                return <div>페이지를 찾을 수 없습니다.</div>;
        }
    }


    return (
        <div className={style['page-container']}>
            <SurveyProgressBar step={nowForm} />
            <div className={style['form-wrapper']}>
                {renderForm()}
            </div>
        </div>
    );
};

export default SurveyPage;