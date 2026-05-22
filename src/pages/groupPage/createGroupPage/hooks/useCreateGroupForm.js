import { useEffect, useState } from 'react';
import { instance } from '@/apis/instance';
import {
  formatDateValue,
  getCurrentMonthStart,
  getTravelRange,
} from '@/pages/groupPage/createGroupPage/utils/travelDate';
import {
  DEFAULT_TRIP_PERIOD,
  PERIOD_BY_TRIP_LENGTH,
  SESSION_KEY,
  TRIP_LENGTH_BY_PERIOD,
} from '../constants/createGroupFormConstants';
import {
  createDateFromValue,
  createTravelRangeFromForm,
  getFieldVariant,
  getInitialFormState,
  hasAtLeastTwoHangulCharacters,
  isValidNickname,
} from '../utils/createGroupFormUtils';

export function useCreateGroupForm() {
  // 폼 payload 전체를 단일 상태로 관리합니다.
  const [form, setForm] = useState(getInitialFormState);
  // 캘린더 UI에서 사용하는 날짜 범위를 별도로 유지합니다.
  const [travelRange, setTravelRange] = useState(() =>
    createTravelRangeFromForm(getInitialFormState()),
  );
  // 저장된 날짜가 있으면 해당 월부터 캘린더를 열 수 있게 초기 월을 맞춥니다.
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const initialTravelRange = createTravelRangeFromForm(getInitialFormState());

    if (initialTravelRange?.from) {
      return new Date(
        initialTravelRange.from.getFullYear(),
        initialTravelRange.from.getMonth(),
        1,
      );
    }

    return getCurrentMonthStart();
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // 입력값이 바뀔 때마다 sessionStorage에 동기화합니다.
  useEffect(() => {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(form));
  }, [form]);

  // 서버에 보내는 tripLength 값을 화면용 기간 문자열로 되돌립니다.
  const tripPeriod =
    PERIOD_BY_TRIP_LENGTH[form.tripLength] ?? DEFAULT_TRIP_PERIOD;

  // 1단계 닉네임 입력을 payload에 반영합니다.
  const handleChangeNickname = (value) => {
    setForm((currentForm) => ({
      ...currentForm,
      leaderNickname: value,
    }));
  };

  // 2단계 그룹 이름 입력을 payload에 반영합니다.
  const handleChangeGroupName = (value) => {
    setForm((currentForm) => ({
      ...currentForm,
      name: value,
    }));
  };

  // 선택한 기간 버튼에 맞춰 tripLength와 종료일을 함께 갱신합니다.
  const handleChangeTripPeriod = (nextTripPeriod) => {
    const nextTripLength =
      TRIP_LENGTH_BY_PERIOD[nextTripPeriod] ??
      TRIP_LENGTH_BY_PERIOD[DEFAULT_TRIP_PERIOD];

    setForm((currentForm) => {
      const nextRange = getTravelRange(
        createDateFromValue(currentForm.startDate),
        nextTripPeriod,
      );

      return {
        ...currentForm,
        tripLength: nextTripLength,
        startDate: formatDateValue(nextRange?.from),
        endDate: formatDateValue(nextRange?.to ?? nextRange?.from),
      };
    });

    setTravelRange((currentRange) =>
      getTravelRange(currentRange?.from, nextTripPeriod),
    );
  };

  // 캘린더에서 선택한 날짜를 payload와 화면 상태에 동시에 반영합니다.
  const handleSelectDate = (date) => {
    const nextRange = getTravelRange(date, tripPeriod);

    setTravelRange(nextRange);
    setForm((currentForm) => ({
      ...currentForm,
      startDate: formatDateValue(nextRange?.from),
      endDate: formatDateValue(nextRange?.to ?? nextRange?.from),
    }));
  };

  // 최종 payload를 서버로 전송하고 성공 시 세션 데이터를 정리합니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    try {
      await instance.post('/api/v1/trip-groups', form);
      sessionStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.error(error);
    }
  };

  // 단계별 입력 스타일과 버튼 활성화에 쓰는 유효성 결과입니다.
  const isNicknameValid = isValidNickname(form.leaderNickname);
  const isTripNameValid = hasAtLeastTwoHangulCharacters(form.name);

  return {
    form,
    travelRange,
    calendarMonth,
    isCalendarOpen,
    tripPeriod,
    isNicknameValid,
    isTripNameValid,
    nicknameVariant: getFieldVariant(form.leaderNickname, isNicknameValid),
    tripNameVariant: getFieldVariant(form.name, isTripNameValid),
    setCalendarMonth,
    setIsCalendarOpen,
    handleChangeNickname,
    handleChangeGroupName,
    handleChangeTripPeriod,
    handleSelectDate,
    handleSubmit,
  };
}
