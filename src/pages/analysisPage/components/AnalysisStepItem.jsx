import {
  AnalysisProcessActiveSvg,
  AnalysisProcessDoneSvg,
  AnalysisProcessPendingSvg,
} from '@/assets/svg/AnalysisSvgs';
import styles from './AnalysisStepItem.module.scss';

const AnalysisStepItem = ({ step, status }) => {
  return (
    <div
      className={`${styles['analysis-step-item']} ${styles[`status-${status}`]}`}
    >
      <p className={styles['analysis-step-number']}>{step.id}</p>
      {step.id !== 4 && (
        <div className={styles['analysis-step-connector']}>
          {status === 'pending' ? (
            <AnalysisProcessPendingSvg />
          ) : status === 'active' ? (
            <AnalysisProcessActiveSvg />
          ) : (
            <AnalysisProcessDoneSvg />
          )}
        </div>
      )}
      <div className={styles['analysis-step-item-text']}>
        <span>{step.title}</span>
        <span>{step.description}</span>
      </div>
      <div className={styles['analysis-step-item-status']}>
        {status === 'pending'
          ? '대기중'
          : status === 'active'
            ? '진행중'
            : '완료'}
      </div>
    </div>
  );
};

export default AnalysisStepItem;
