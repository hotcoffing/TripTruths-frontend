import styles from './ResultsPage.module.scss';
import PlanList from './components/PlanList';
import ConflictList from './components/ConflictList';
import { useEffect } from 'react';
import { getAnalysisResults } from '@/apis/analysisApi';
import { useParams } from 'react-router-dom';
import { storage } from '@/utils/storage';

const ResultsPage = () => {
  const { inviteCode } = useParams();
  const { tripGroupId } = storage.get(inviteCode);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await getAnalysisResults(tripGroupId);
        console.log(response);
      } catch (err) {
        console.log('결과 가져오기 실패', err);
      }
    };

    fetchResults();
  }, [tripGroupId]);

  return (
    <div className={styles['results-page']}>
      <div className={styles['results-phone-frame']}>
        <main className={styles['results-content']}>
          <section className={styles['results-hero']}>
            <p className={styles['results-hero-subtitle']}>AI 분석 결과</p>
            <h1>여름 여행</h1>
            <p className={styles['results-hero-meta']}>
              2025.08.07 - 2025.08.08 총 4명
            </p>
          </section>

          <section className={styles['results-section']}>
            <h2>이번 AI가 발견한 갈등</h2>
            <ConflictList />
          </section>

          <section className={styles['results-section']}>
            <h2>추천 플랜 TOP 3</h2>
            <PlanList />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ResultsPage;
