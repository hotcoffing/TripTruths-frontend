import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@/components/common/button/Button';
import CalendarBottomSheet from '@/components/common/calendarBottomSheet/CalendarBottomSheet';
import {
  formatTravelDateRange,
  getCurrentMonthStart,
  getTravelRange,
} from '@/utils/travelDate';
import styles from './CreateGroupPage.module.scss';
import NicknameStep from './components/NicknameStep';
import TripInfoStep from './components/TripInfoStep';

const NICKNAME_PATTERN = /^[A-Za-zㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;
const GROUP_NAME_PATTERN = /^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/;

const getFieldVariant = (value, isValid) => {
  if (!value.trim()) {
    return 'default';
  }

  return isValid ? 'success' : 'error';
};

const CreateGroupPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');
  const [tripName, setTripName] = useState('');
  const [tripPeriod, setTripPeriod] = useState('1박 2일');
  const [travelRange, setTravelRange] = useState();
  const [calendarMonth, setCalendarMonth] = useState(getCurrentMonthStart);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleChangeTripPeriod = (nextTripPeriod) => {
    setTripPeriod(nextTripPeriod);
    setTravelRange((currentRange) =>
      getTravelRange(currentRange?.from, nextTripPeriod),
    );
  };

  const isNicknameValid = NICKNAME_PATTERN.test(nickname.trim());
  const isTripNameValid = GROUP_NAME_PATTERN.test(tripName.trim());
  const nicknameVariant = getFieldVariant(nickname, isNicknameValid);
  const tripNameVariant = getFieldVariant(tripName, isTripNameValid);
  const isFirstStep = params.step === '1';
  const isCurrentStepValid = isFirstStep ? isNicknameValid : isTripNameValid;

  return (
    <form className={styles['create-group-page']}>
      <section className={styles['create-group-section']}>
        {isFirstStep ? (
          <NicknameStep
            nickname={nickname}
            setNickname={setNickname}
            nicknameVariant={nicknameVariant}
            nicknameMessage="2~10자 한글/영문만 입력 가능합니다."
          />
        ) : (
          <TripInfoStep
            tripName={tripName}
            setTripName={setTripName}
            tripNameVariant={tripNameVariant}
            tripNameMessage="2~10자 한글만 입력 가능합니다."
            tripPeriod={tripPeriod}
            setTripPeriod={handleChangeTripPeriod}
            travelDate={formatTravelDateRange(travelRange)}
            onOpenCalendar={() => setIsCalendarOpen(true)}
          />
        )}
      </section>

      <div className={styles['create-group-cta']}>
        <Button
          type={isFirstStep ? 'button' : 'submit'}
          variant={isCurrentStepValid ? 'brand' : 'muted'}
          disabled={!isCurrentStepValid}
          onClick={() => {
            isFirstStep ? navigate('/group/create/2') : navigate('/');
          }}
        >
          다음
        </Button>
      </div>

      <CalendarBottomSheet
        open={isCalendarOpen}
        month={calendarMonth}
        selectedRange={travelRange}
        onMonthChange={setCalendarMonth}
        onSelectDate={(date) =>
          setTravelRange(getTravelRange(date, tripPeriod))
        }
        onClose={() => setIsCalendarOpen(false)}
        onConfirm={() => setIsCalendarOpen(false)}
      />
    </form>
  );
};

export default CreateGroupPage;
