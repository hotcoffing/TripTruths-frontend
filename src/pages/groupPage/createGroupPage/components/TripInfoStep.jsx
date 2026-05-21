import InputField from '@/components/common/inputField/InputField';
import styles from './TripInfoStep.module.scss';

const PreviousStepIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="22"
      viewBox="0 0 12 22"
      fill="none"
    >
      <path
        d="M11 1L1 11.2041L11 21"
        stroke="#848B9C"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const CalendarIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_863_96)">
        <path
          d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V10H19V20ZM9 14H7V12H9V14ZM13 14H11V12H13V14ZM17 14H15V12H17V14ZM9 18H7V16H9V18ZM13 18H11V16H13V18ZM17 18H15V16H17V18Z"
          fill="#191919"
        />
      </g>
      <defs>
        <clipPath id="clip0_863_96">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const periodOptions = ['당일치기', '1박 2일', '2박 3일', '3박 4일'];

const TripInfoStep = () => {
  return (
    <>
      <div
        className={styles['create-group-back']}
        onClick={() => window.history.back()}
      >
        <PreviousStepIcon />
      </div>

      <h1 className={styles['create-group-title']}>Trip Truth</h1>

      <div className={styles['create-group-text']}>
        <h2>새 여행 그룹 만들기</h2>
      </div>

      <div className={styles['create-group-input']}>
        <InputField
          placeholder="그룹 이름을 입력해 주세요"
          variant="default"
          message="2~10자 한글만 입력 가능합니다."
        />
      </div>

      <div className={styles['create-group-period']}>
        <div className={styles['create-group-period-text']}>
          <h3>여행 기간</h3>
          <p>현재는 최대 3박 4일 여행까지만 추천을 지원하고 있어요</p>
        </div>
        <div className={styles['create-group-period-options']}>
          {periodOptions.map((option) => (
            <div key={option}>{option}</div>
          ))}
        </div>
      </div>

      <div className={styles['create-group-period-input']}>
        <h4>
          여행 기간 <span>(선택)</span>
        </h4>
        <InputField
          placeholder="YYYY-MM-DD"
          variant="default"
          icon={<CalendarIcon />}
        />
      </div>
    </>
  );
};

export default TripInfoStep;
