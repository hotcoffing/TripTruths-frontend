import style from "./survey_button.module.scss"; 

function SurveyButton({ 
    type,                       // 버튼의 스타일 
    size,                       // 버튼의 크기
    content,                    // 버튼의 내용
    isSelected = false,         // 버튼이 선택되었는지 여부
    onClick = () => {},         // 버튼 클릭 시 실행할 함수 (스타일 변경 및 상태 변경)
    ...props                    // 나머지 props 
}) {
    return (
        <button 
            className={[
                style.button,                             
                style[`button-${type}`],                  
                style[`button-${size}`],                  
                isSelected ? style.clicked : ''           
            ].filter(Boolean).join(' ')}
            onClick={onClick}
            {...props}
        >
            <span>{content}</span>
        </button>
    );
}

export default SurveyButton;