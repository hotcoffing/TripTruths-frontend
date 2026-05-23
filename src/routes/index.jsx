import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '@/layouts/RootLayout';
import MainPage from '@/pages/MainPage';
import AnalysisPage from '@/pages/analysisPage/AnalysisPage';
import ResultsPage from '@/pages/resultsPage/ResultsPage';
import SurveyPage from '@/pages/surveyPage/SurveyPage';
import GroupPage from '@/pages/groupPage/GroupPage';
import GroupPageMock from '@/pages/groupPage/GroupPageMock';

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
      { 
        path: '/survey', 
        element: <SurveyPage /> 
      },
      {
        path: '/group',
        element: <GroupPage />,
      },
      {
        path: '/group/mock',
        element: <GroupPageMock />,
      },
    ],
  },
]);

export default router;
