export const topPlans = [
  {
    title: '강릉 1박 2일',
    rank: '1순위',
    budgetTag: { label: '예산 적정', tone: 'green' },
    satisfactionTag: { label: '만족도 86%', tone: 'green' },
    voteLabel: '현재 2명 총 4명 중',
    expanded: true,
    sections: [
      {
        label: 'DAY 1',
        items: [
          { time: '11:00', title: '강릉역 도착' },
          {
            time: '12:00',
            title: '점심 맛집 (초당순두부)',
            note: '민수의 맛집 선호를 반영했어요.',
          },
          {
            time: '14:00',
            title: '서핑 체험',
            note: '활동적인 일정 선호를 만족하는 코스예요.',
          },
          {
            time: '17:00',
            title: '바다뷰 카페',
            note: '지은이의 휴식 취향을 고려했어요.',
          },
          { time: '19:00', title: '저녁 (해산물)' },
        ],
      },
      {
        label: 'DAY 2',
        items: [
          { time: '09:00', title: '호텔 조식' },
          {
            time: '10:00',
            title: '경포대 산책',
            note: '자연과 여유를 함께 즐길 수 있어요.',
          },
          { time: '14:00', title: '카페 + 출발' },
        ],
      },
    ],
  },
  {
    title: '부산 1박 2일',
    rank: '2순위',
    budgetTag: { label: '예산 부담', tone: 'red' },
    satisfactionTag: { label: '만족도 79%', tone: 'green' },
    voteLabel: '현재 1명 총 4명 중',
    sections: [
      {
        label: 'DAY 1',
        items: [
          { time: '10:30', title: '부산역 도착' },
          {
            time: '12:00',
            title: '해운대 점심',
            note: '바다 풍경과 식사를 함께 즐길 수 있어요.',
          },
          {
            time: '14:30',
            title: '블루라인파크 탑승',
            note: '이동 자체가 여행 코스가 되는 일정이에요.',
          },
          {
            time: '18:00',
            title: '광안리 야경 산책',
            note: '사진 찍기 좋은 포인트를 넣었어요.',
          },
          { time: '20:00', title: '돼지국밥 저녁' },
        ],
      },
      {
        label: 'DAY 2',
        items: [
          { time: '09:00', title: '호텔 조식' },
          {
            time: '10:30',
            title: '흰여울문화마을 산책',
            note: '가벼운 도보 일정으로 마무리해요.',
          },
          { time: '13:00', title: '오션뷰 카페 후 출발' },
        ],
      },
    ],
  },
  {
    title: '통영 1박 2일',
    rank: '3순위',
    budgetTag: { label: '예산 여유', tone: 'blue' },
    satisfactionTag: { label: '만족도 73%', tone: 'green' },
    voteLabel: '현재 1명 총 4명 중',
    sections: [
      {
        label: 'DAY 1',
        items: [
          { time: '11:00', title: '통영터미널 도착' },
          {
            time: '12:30',
            title: '중앙시장 점심',
            note: '해산물 중심 코스로 현지 분위기를 살렸어요.',
          },
          {
            time: '15:00',
            title: '미륵산 케이블카',
            note: '풍경 감상 비중이 높은 코스예요.',
          },
          {
            time: '17:30',
            title: '동피랑 벽화마을 산책',
            note: '느긋하게 둘러보기 좋은 일정이에요.',
          },
          { time: '19:00', title: '충무김밥 저녁' },
        ],
      },
      {
        label: 'DAY 2',
        items: [
          { time: '09:30', title: '숙소 체크아웃' },
          {
            time: '11:00',
            title: '이순신공원 산책',
            note: '조용한 바다 풍경을 보며 마무리할 수 있어요.',
          },
          { time: '14:00', title: '카페 들른 뒤 출발' },
        ],
      },
    ],
  },
];
