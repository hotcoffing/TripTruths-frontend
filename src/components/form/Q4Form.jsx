import style from './Q4Form.module.scss';
import SurveyInfo from '../feat/SurveyInfo';
import SurveySlider from '../feat/SurveySlider';
import Button from '../feat/SurveyButton';

function Q4Form({ 
        currentCharge,      // 슬라이더 현재 값
        setCurrentCharge,   // 슬라이더 값 변경 핸들러
        handleIsNext,       // 다음 버튼 핸들러
        handlePrev,         // 이전 버튼 핸들러
    }) {

    return (
        <div className={style['Q4-container']}>
            <SurveyInfo type="Q4" />

            <div className={style['slider-area']}>
                <SurveySlider 
                    currentCharge={currentCharge}
                    setCurrentCharge={setCurrentCharge}
                />
            </div>

            <div className={style['action-container']}>
                <Button
                    type="prev-action"
                    size="md"
                    content="이전"
                    onClick={handlePrev}
                />
                <Button
                    type="next-action"
                    size="md"
                    content="다음"
                    isActive={true} 
                    onClick={() => handleIsNext("Q5", currentCharge)}
                />
            </div>
        </div>
    )
}

export default Q4Form;
