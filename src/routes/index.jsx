import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import MainPage from '../pages/MainPage';
import SurveyPage from '../pages/SurveyPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/survey',
        element: <SurveyPage />, 
      }
    ],
  },
]);

export default router;
