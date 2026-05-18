import {
  AnalysisProcessActiveSvg,
  AnalysisProcessDoneSvg,
  AnalysisProcessPendingSvg,
} from '@/assets/svg/AnalysisSvgs';

export const ANALYSIS_STEP_STATUS_META = {
  pending: {
    label: '대기중',
    connector: AnalysisProcessPendingSvg,
  },
  active: {
    label: '진행중',
    connector: AnalysisProcessActiveSvg,
  },
  done: {
    label: '완료',
    connector: AnalysisProcessDoneSvg,
  },
};
