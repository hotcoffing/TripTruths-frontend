import style from "./GroupHeader.module.scss"

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
    const duration = validDuration ? `/ ${formatDate(startDate)} ~ ${formatDate(endDate)}` : "";
    
    return (
        <div className={style['header-container']}>
            <p className={style['header-name']}>{groupName}</p>
            <p className={style['header-duration']}>{tripLength - 1}박 {tripLength}일 {duration}</p>
        </div>
    );
}

export default GroupHeader;