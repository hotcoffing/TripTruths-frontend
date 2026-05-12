import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  return (
    <div>
      RootLayout
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
