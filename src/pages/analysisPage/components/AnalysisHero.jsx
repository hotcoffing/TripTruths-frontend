import { AnalysisHeroSvg } from '@/assets/svg/AnalysisSvgs';
import styles from './AnalysisHero.module.scss';

const AnalysisHero = () => {
  return (
    <div className={styles['analysis-hero']}>
      <AnalysisHeroSvg />
      <div className={styles['analysis-text']}>
        <p>AI가 모두의 진심을 듣고 있어요</p>
        <p>최적의 플랜을 만드는 중...</p>
      </div>
    </div>
  );
};

export default AnalysisHero;
