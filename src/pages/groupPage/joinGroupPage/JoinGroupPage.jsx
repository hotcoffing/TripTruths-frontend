import Button from '@/components/common/button/Button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NicknameStep from '../createGroupPage/components/NicknameStep';
import styles from './JoinGroupPage.module.scss';
import { getFieldVariant, isValidNickname } from '@/utils/GroupFormUtils';

const JoinGroupPage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState('');

  const isNicknameValid = isValidNickname(nickname);
  const nicknameVariant = getFieldVariant(nickname, isNicknameValid);

  const handleSubmit = () => {
    console.log(nickname);
  };

  return (
    <form onSubmit={handleSubmit} className={styles['create-group-page']}>
      <section className={styles['create-group-section']}>
        <NicknameStep
          title={
            <>
              ‘여름여행’
              <br />
              그룹에 초대됐어요
            </>
          }
          subTitle="1박 2일 / 6월 첫째 주"
          nickname={nickname}
          setNickname={setNickname}
          nicknameVariant={nicknameVariant}
          nicknameMessage="2~10자 한글/영문만 입력 가능합니다."
        />
      </section>

      <div className={styles['create-group-cta']}>
        <Button
          type="submit"
          variant={isNicknameValid ? 'brand' : 'muted'}
          disabled={!isNicknameValid}
          onClick={() => {
            navigate('/');
          }}
        >
          다음
        </Button>
      </div>
    </form>
  );
};

export default JoinGroupPage;
