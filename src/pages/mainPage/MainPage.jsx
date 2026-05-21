import Button from '@/components/common/Button';
import styles from './MainPage.module.scss';

const MainPage = () => {
  return (
    <main className={styles['main-page']}>
      <section className={styles['main-hero']}>
        <h1 className={styles['main-title']}>Trip Truth</h1>
        <p className={styles['main-subtitle']}>각자의 취향을, 하나의 여행으로</p>
      </section>
      <div className={styles['main-cta']}>
        <Button variant="light">시작하기</Button>
      </div>
    </main>
  );
};

export default MainPage;
