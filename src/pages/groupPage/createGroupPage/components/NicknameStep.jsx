import InputField from '@/components/common/inputField/InputField';
import styles from './NicknameStep.module.scss';

const NicknameStep = ({ nickname, setNickname }) => {
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
          onChange={(e) => setNickname(e.target.value)}
          placeholder="닉네임을 입력해 주세요"
          variant="default"
          message="2~10자 한글/영문만 입력 가능합니다."
        />
      </div>
    </>
  );
};

export default NicknameStep;
