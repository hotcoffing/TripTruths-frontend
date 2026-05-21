import Button from '@/components/common/button/Button';
import styles from './CreateGroupPage.module.scss';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NicknameStep from './components/NicknameStep';
import TripInfoStep from './components/TripInfoStep';

const CreateGroupPage = () => {
  const params = useParams();
  const [nickname, setNickname] = useState('');

  return (
    <main className={styles['create-group-page']}>
      <section className={styles['create-group-section']}>
        {params.step === '1' ? (
          <NicknameStep nickname={nickname} setNickname={setNickname} />
        ) : (
          <TripInfoStep />
        )}
      </section>
      <div className={styles['create-group-cta']}>
        <Button variant="muted">다음</Button>
      </div>
    </main>
  );
};

export default CreateGroupPage;
