import style from "./GroupHeader.module.scss"

// trip_group.trip_length ENUM → 표시 문구 (triptruth.sql)
const TRIP_LENGTH_LABELS = {
    DAY_TRIP: "당일",
    ONE_NIGHT: "1박 2일",
    TWO_NIGHTS: "2박 3일",
    THREE_NIGHTS_PLUS: "3박 4일 이상",
};

// 날짜 객체를 'YYYY.MM.DD' 형식으로 변환해주는 헬퍼 함수
const formatDate = (dateInput) => {
    if (!dateInput) return "";
    
    const date = new Date(dateInput);
    // 올바른 날짜 데이터가 아닐 경우 빈 문자열 반환
    if (isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}.${month}.${day}`;
};

function GroupHeader({groupName, tripLength, startDate = null, endDate = null}) {
    const validDuration = startDate != null && endDate != null;

    let duration = "";
    if (validDuration) {
        duration = `/ ${formatDate(startDate)} ~ ${formatDate(endDate)}`;
    }

    let tripLengthLabel = "일정 미정";
    if (tripLength != null && TRIP_LENGTH_LABELS[tripLength]) {
        tripLengthLabel = TRIP_LENGTH_LABELS[tripLength];
    } else if (tripLength === 2 || tripLength === "2") {
        // API가 숫자 일수만 내려주는 경우 (레거시)
        tripLengthLabel = "1박 2일";
    }

    let displayGroupName = "그룹";
    if (groupName != null && groupName !== "") {
        displayGroupName = groupName;
    }

    return (
        <div className={style['header-container']}>
            <p className={style['header-name']}>{displayGroupName}</p>
            <p className={style['header-duration']}>{tripLengthLabel} {duration}</p>
        </div>
    );
}

export default GroupHeader;
