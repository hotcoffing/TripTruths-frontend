import style from "./GroupInvite.module.scss";
import LinkImg from "@/assets/Link.svg"
import CopyImg from "@/assets/Copy.svg"
import KakaoImg from "@/assets/Kakao.svg"
import Button from "@/components/common/Button"

function GroupInvite({handleCopyLink, handleKakao}) {
    const infoText = "친구 초대";
    const warningText = "원활한 조율을 위해 초대는 최대 6명까지 추천드립니다.";
    const linkText = "링크 복사하기";
    const kakaoShareText = "카카오톡으로 공유하기";

    return (
        <div className={style['invite-container']}>
            <img src={LinkImg} className={style['img-icon']} />
            <span className={style['invite-info']} >{infoText}</span>
            <p className={style['invite-warning']}>{warningText}</p>
            <Button 
                type="select" 
                size="md" 
                imgSrc={CopyImg} 
                content={linkText} 
                onClick={() => handleCopyLink()}
            />
            <Button 
                type="kakao" 
                size="md" 
                imgSrc={KakaoImg} 
                content={kakaoShareText} 
                onClick={() => handleKakao()}
            />
        </div>
    );
}

export default GroupInvite;