import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import MainPage from '@/pages/mainPage/MainPage';
import AnalysisPage from '@/pages/analysisPage/AnalysisPage';
import ResultsPage from '@/pages/resultsPage/ResultsPage';
import SurveyPage from '@/pages/surveyPage/SurveyPage';
import CreateGroupPage from '@/pages/groupPage/createGroupPage/CreateGroupPage';
import JoinGroupPage from '@/pages/groupPage/joinGroupPage/JoinGroupPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/analysis',
        element: <AnalysisPage />,
      },
      {
        path: '/results',
        element: <ResultsPage />,
      },
      { path: '/survey', element: <SurveyPage /> },
      { path: '/group/create/:step', element: <CreateGroupPage /> },
      { path: '/group/join', element: <JoinGroupPage /> },
    ],
  },
]);

export default router;
