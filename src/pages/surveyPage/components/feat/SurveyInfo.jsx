import style from "./SurveyInfo.module.scss";
import LockImg from "@/assets/Lock.svg";
import PeopleImg from "@/assets/People.svg";
import WarningImg from "@/assets/Warning.svg";

function SurveyInfo({ type, isError = false }) {
    // 정적 텍스트 데이터 정의
    const imageDescriptions = [
        "이 답변은 결과 페이지에서 공개됩니다",
        "누가 입력했는지 다른 멤버는 알 수 없어요",
        "최소 한 개 이상 선택해 주세요"
    ];

    const questionDescriptions = {
        Q1: "Q1. 이번 여행, 어떤 무드를 원하세요?",
        Q2: "Q2. 꼭 하고 싶은 활동이 있다면?",
        Q3: "Q3. 절대 피하고 싶은 것이 있다면?",
        Q4: "Q4. 솔직한 1인 예산은?",
        Q5: "Q5. 마지막으로 한 마디!"
    };

    const subDescriptions = {
        Q1: "최대 2개까지 선택 가능합니다.",
        Q2: "최대 3개까지 선택 가능합니다.",
        Q3: "선택 입력 - 비워두셔도 됩니다",
        Q4: "숙박 + 교통 + 식비 + 활동 모두 포함",
        Q5: "선택 입력 - 비워두셔도 됩니다"
    };

    // 조건에 따른 변수 할당 (useState를 쓰지 않고 일반 변수 사용)
    let imgSrc = "";
    let imgDescription = "";

    if (isError) {
        imgSrc = WarningImg;
        imgDescription = imageDescriptions[2];
    } else {
        if (type === 'Q1' || type === 'Q2') {
            imgSrc = PeopleImg;
            imgDescription = imageDescriptions[0];
        } else if (type === 'Q3' || type === 'Q4' || type === 'Q5') {
            imgSrc = LockImg;
            imgDescription = imageDescriptions[1];
        }
    }

    // 객체의 key(Q1~Q5)를 이용해 텍스트를 바로 매칭
    const questionDescription = questionDescriptions[type] || "";
    const subDescription = subDescriptions[type] || "";

    // 3. JSX 데이터 바인딩
    return (
        <div className={style['info-container']}>
            <img src={imgSrc} alt={type} className={style['img-icon']} />
            <p className={[
                style['img-description'],
                isError ? style['error'] : ""
            ].filter(Boolean).join(" ")}>{imgDescription}</p>
            <p className={style['question-description']}>{questionDescription}</p>
            {subDescription && <p className={style['sub-description']}>{subDescription}</p>}
        </div>  
    );
}

export default SurveyInfo;