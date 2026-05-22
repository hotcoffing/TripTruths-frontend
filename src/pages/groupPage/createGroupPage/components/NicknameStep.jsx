import InputField from '@/components/common/inputField/InputField';
import styles from './NicknameStep.module.scss';

const NicknameStep = ({
  nickname,
  setNickname,
  nicknameVariant = 'default',
  nicknameMessage = '',
}) => {
  return (
    <>
      <h1 className={styles['create-group-title']}>Trip Truth</h1>

      <div className={styles['create-group-text']}>
        <h2>어떤 이름으로 부를까요?</h2>
        <p>친구들에게 보일 이름이에요</p>
      </div>

      <div className={styles['create-group-input']}>
        <InputField
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
          placeholder="닉네임을 입력해 주세요"
          variant={nicknameVariant}
          message={nicknameMessage}
        />
      </div>
    </>
  );
};

export default NicknameStep;
