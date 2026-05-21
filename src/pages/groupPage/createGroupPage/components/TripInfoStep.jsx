import InputField from '@/components/common/inputField/InputField';
import styles from './TripInfoStep.module.scss';
import { CalendarSvg, PreviousStepSvg } from '@/assets/svg/CreateGroupSvgs';

const periodOptions = ['당일치기', '1박 2일', '2박 3일', '3박 4일'];

const TripInfoStep = () => {
  return (
    <>
      <div
        className={styles['create-group-back']}
        onClick={() => window.history.back()}
      >
        <PreviousStepSvg />
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
          icon={<CalendarSvg />}
        />
      </div>
    </>
  );
};

export default TripInfoStep;
