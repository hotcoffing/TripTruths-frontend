import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout = () => {
  // PWA 여부 확인
  const [isPWA, setIsPWA] = useState(false);

  useEffect(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone;
    setIsPWA(Boolean(isStandalone));
  }, []);

  // 목표 : 모바일 브라우저에서만 여백 조정 (PC, pwa 환경에서는 여백 조정 안함)
  const rootLayoutClassName = isPWA ? 'is-pwa' : 'is-browser';

  return (
    <div className={rootLayoutClassName}>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
