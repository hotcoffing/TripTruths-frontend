import style from "./SurveyButton.module.scss"; 

function SurveyButton({ 
    type,                       // 버튼의 스타일 
    size,                       // 버튼의 크기
    content,                    // 버튼의 내용
    className = '',             // 추가적인 클래스 이름 (선택 사항)
    isSelected = false,         // 버튼이 선택되었는지 여부
    isActive = false,           // 버튼이 활성화되었는지 여부
    onClick = () => {},         // 버튼 클릭 시 실행할 함수 (상태 변경)
    ...props                    // 나머지 props 
}) {
    const classes = [
        style.button,                             
        style[`button-${type}`],                  
        style[`button-${size}`],                  
        isSelected ? style.clicked : '' , 
        isActive ? style.active : '',
        className,
    ].filter(Boolean).join(' ')

    return (
        <button 
            className={classes}
            onClick={onClick}
            {...props}
        >
            <span>{content}</span>
        </button>
    );
}

export default SurveyButton;