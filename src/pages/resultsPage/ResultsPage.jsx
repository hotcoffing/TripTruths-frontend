import styles from './ResultsPage.module.scss';

const conflictCards = [
  {
    tone: 'warning',
    badge: '🟡 잠재적 충돌',
    title: '예산 차이가 있어요',
    lines: [
      '모두에게 부담 없는 플랜으로 설계했어요',
      '일부 멤버의 예산이 빠듯한 편이라,',
    ],
  },
  {
    tone: 'danger',
    badge: '🔴 명시적 충돌',
    title: '액티비티 vs 휴양',
    lines: ['액티비티 선호: 수민, 민지'],
  },
  {
    tone: 'muted',
    badge: '🟣 묻힌 제약',
    title: '그룹에 다음과 같은 제약이 있어요:',
    lines: [
      '• 비행기 이용이 어려움',
      '• 새벽 출발이 어려움',
      '모든 추천 플랜에 반영됐어요',
    ],
  },
];

const rankedPlans = [
  {
    title: '부산 1박2일',
    summary: '💰 예산 적정  ⭐ 만족도 79% 1표',
  },
  {
    title: '통영 1박2일',
    summary: '💰 예산 여유  ⭐ 만족도 73% 0표',
  },
];

const mainPlan = {
  title: '강릉 1박2일',
  badge: '1순위',
  summary: ['💰 예산-(50만원)-적정', '⭐ 만족도 86%'],
  sections: [
    {
      label: 'DAY 1',
      items: [
        { time: '11:00', title: '강릉역 도착' },
        {
          time: '12:00',
          title: '현지 맛집 (초당순두부)',
          note: '⭐ 민지의 맛집 욕구 충족',
        },
        {
          time: '14:00',
          title: '서핑 체험 🏄',
          note: '⭐ 수민의 액티비티 욕구 충족',
        },
        {
          time: '17:00',
          title: '바다뷰 카페 ☕',
          note: '⭐ 지훈의 휴양 욕구 충족',
        },
        { time: '19:00', title: '해산물 저녁' },
      ],
    },
    {
      label: 'DAY 2',
      items: [
        { time: '09:00', title: '호텔 조식' },
        {
          time: '10:00',
          title: '경포호 산책 🌳',
          note: '⭐ 서영의 자연 욕구 충족',
        },
        { time: '14:00', title: '카페 + 출발' },
      ],
    },
  ],
  footer: '✅ 모든 친구의 핵심 욕구가 담겼어요',
  cta: '👍 이 플랜 투표하기 (현재 2표)',
};

const ResultsPage = () => {
  return (
    <div className={styles['results-page']}>
      <div className={styles['results-phone-frame']}>
        <header className={styles['results-status-bar']}>
          <span className={styles['results-time']}>9:41</span>
          <div className={styles['results-status-icons']}>
            <span className={styles.signal} />
            <span className={styles.wifi} />
            <span className={styles.battery} />
          </div>
        </header>

        <main className={styles['results-content']}>
          <section className={styles['results-hero']}>
            <h1>여름여행 — AI 분석 결과</h1>
            <p>1박2일 / 2025.06.07 ~ 2025.06.08</p>
          </section>

          <section className={styles['results-section']}>
            <h2>🔍 AI가 발견한 충돌</h2>
            <div className={styles['results-conflict-list']}>
              {conflictCards.map((card) => (
                <article
                  key={card.title}
                  className={`${styles['results-card']} ${styles[`tone-${card.tone}`]}`}
                >
                  <p className={styles['results-card-badge']}>{card.badge}</p>
                  <h3>{card.title}</h3>
                  <div className={styles['results-card-lines']}>
                    {card.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className={styles['results-section']}>
            <h2>📋 추천 플랜 Top 3</h2>

            <div className={styles['results-plan-list']}>
              {rankedPlans.map((plan) => (
                <article
                  key={plan.title}
                  className={`${styles['results-card']} ${styles['results-plan-preview']}`}
                >
                  <div>
                    <h3>📍 {plan.title}</h3>
                    <p>{plan.summary}</p>
                  </div>
                  <span className={styles['results-arrow']}>▶</span>
                </article>
              ))}
            </div>

            <article
              className={`${styles['results-card']} ${styles['results-main-plan']}`}
            >
              <div className={styles['results-main-head']}>
                <div>
                  <h3>📍 {mainPlan.title}</h3>
                  <div className={styles['results-main-summary']}>
                    {mainPlan.summary.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
                <span className={styles['results-rank-badge']}>{mainPlan.badge}</span>
              </div>

              <div className={styles['results-timeline']}>
                {mainPlan.sections.map((section) => (
                  <div
                    key={section.label}
                    className={styles['results-day-section']}
                  >
                    <div className={styles['results-day-label']}>{section.label}</div>
                    {section.items.map((item) => (
                      <div
                        key={`${section.label}-${item.time}`}
                        className={styles['results-timeline-row']}
                      >
                        <p className={styles['results-time-label']}>{item.time}</p>
                        <div className={styles['results-timeline-copy']}>
                          <p>{item.title}</p>
                          {item.note && (
                            <span className={styles['results-timeline-note']}>
                              {item.note}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className={styles['results-main-footer']}>{mainPlan.footer}</div>
              <button type="button" className={styles['results-vote-button']}>
                {mainPlan.cta}
              </button>
            </article>
          </section>
        </main>

        <footer className={styles['results-home-indicator']}>
          <span />
        </footer>
      </div>
    </div>
  );
};

export default ResultsPage;
