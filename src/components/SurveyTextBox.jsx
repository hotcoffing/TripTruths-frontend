import style from "./SurveyTextBox.module.scss";

function SurveyTextBox({ text, setText, type, onChange }) {
    const maxLength = 200;

    const placeholder = type === "Q3" 
        ? '자유롭게 입력해 주세요.' 
        : type === "Q5" 
        ? '예시) 취준 중이라 멀리 못 감' 
        : '';

    // 200자 도달 유효성 검사
    const isLimit = text.length >= maxLength;

    const handleChange = (e) => {
        const newText = e.target.value;

        // 200자까지만 잘라서 상태에 저장 (200자 초과 입력 차단)
        if (newText.length <= maxLength) {
            setText(newText);
            if (onChange) {
                onChange(newText);
            }
        }
    };

    return (
        <div className={style.container}>
            <textarea 
                className={[
                    style.textarea,
                    isLimit ? style.error : "" // 200자 도달 시 에러 스타일 적용 (추후 필요시 사용)
                ].filter(Boolean).join(" ")} 
                placeholder={placeholder}
                value={text}
                onChange={handleChange}
            />
            <div className={[
                style.charCount,
                isLimit ? style.errorText : "" // 200자 도달 시 텍스트 색상 변경
            ].filter(Boolean).join(" ")}>
                {text.length}/{maxLength}
            </div>
        </div>
    );
}

export default SurveyTextBox;