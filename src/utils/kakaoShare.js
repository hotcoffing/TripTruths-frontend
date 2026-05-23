import image from "@/assets/public/KakaoFeedImage.jpg";

export function initKakao() {
    const key = import.meta.env.VITE_KAKAO_JS_KEY;
    if (!key) {
        console.error("VITE_KAKAO_JS_KEY가 없습니다.");
        return false;
    }
    if (!window.Kakao) {
        console.error("Kakao SDK가 로드되지 않았습니다.");
        return false;
    }
    if (!window.Kakao.isInitialized()) {
        window.Kakao.init(key);
    }
    return true;
}
  
export function shareInviteLink({ inviteCode, groupName }) {
    if (!initKakao()) return;

    const inviteUrl = `${window.location.origin}/invite/${inviteCode}`;
    const imageUrl = new URL(image, window.location.origin).href;

    window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
            title: groupName ?? "TripTruths 여행 초대",
            description: "함께 여행 취향을 맞춰보세요!",
            imageUrl: imageUrl,
            link: {
                mobileWebUrl: inviteUrl,
                webUrl: inviteUrl,
            },
        },
        buttons: [
            {
                title: "초대 링크로 참여",
                link: {
                    mobileWebUrl: inviteUrl,
                    webUrl: inviteUrl,
                },
            },
        ],
    });
}