import style from './Q5Form.module.scss';
import SurveyInfo from '../feat/SurveyInfo';
import SurveyTextBox from '../feat/SurveyTextBox';
import Button from '../feat/SurveyButton';
import RepeatBr from '../RepeatBr';

function Q5Form({ 
        text,               // Q5 텍스트 내용
        setText,            // Q5 텍스트 핸들러
        handleIsNext,       // 제출 핸들러
        handlePrev,         // 이전 버튼 핸들러
    }) {

    return (
        <div className={style['Q5-container']}>
            <SurveyInfo type="Q5" />
            
            <div className={style['content-area']}>
                <RepeatBr count={2} />
                <SurveyTextBox
                    text={text}
                    setText={setText}
                    placeholder="팀원들에게 하고 싶은 말을 자유롭게 적어주세요"
                />
                <RepeatBr count={6} />
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
                    content="제출하기"
                    isActive={true} // 선택 사항이므로 항상 활성화
                    onClick={() => handleIsNext("SUBMIT", text)}
                />
            </div>
        </div>
    )
}

export default Q5Form;
