import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';
import MainPage from '../pages/MainPage';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
