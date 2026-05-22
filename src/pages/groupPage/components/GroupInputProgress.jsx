import style from "./GroupInputProgress.module.scss";
import LeaderImg from "@/assets/Leader.svg"
import ParticipantImg from "@/assets/Participant.svg"
import Button from "@/components/common/Button"

// group_member.is_survey_completed (triptruth.sql) — API·직렬화 형태 차이 대응
function isMemberSurveyCompleted(member) {
    if (member.is_survey_completed === true) {
        return true;
    }
    if (member.is_survey_completed === 1) {
        return true;
    }
    // API가 카멜 케이스 형식 JSON을 내려주는 경우
    if (member.isSurveyCompleted === true) {
        return true;
    }
    if (member.isSurveyCompleted === 1) {
        return true;
    }
    return false;
}

// member.id와 myId(number/string) 비교
function isSameMemberId(memberId, myId) {
    if (myId == null || memberId == null) {
        return false;
    }
    return Number(memberId) === Number(myId);
}

function GroupInputProgress({myId, memberList, handleMovePage}) {
    const progressInfoText = "입력 현황";
    const members = Array.isArray(memberList) ? memberList : [];
    const completeMembers = members.filter(
        // 객체 프로퍼티 명은 DB 내용 참고
        (member) => isMemberSurveyCompleted(member)
    );
    const progressCount = `${completeMembers.length}/${members.length}`;

    return (
        <div className={style['progress-wrapper']}>
            <div className={style['progress-info-container']}>
                <span className={style['progress-info']}>{progressInfoText}</span>
                <span className={style['progress-count']}>{progressCount}</span>
            </div>
            <div className={style['progress-member-container']}>
                {members.map((item) => {
                    // 정적 텍스트 내용
                    const buttonContent = "내 응답 입력하기 →";
                    const completedText = "완료";
                    const pendingText = "대기중";
                    
                    // 유효성 검사 (데이터가 없는 경우 무시)
                    if (item?.id == null) {
                        return null;
                    }

                    // group_member 컬럼 변수화
                    const nickname = item.nickname ?? "이름 없음 (오류)";
                    const role = item.role;
                    const isCompleted = isMemberSurveyCompleted(item);
                    const isMe = isSameMemberId(item.id, myId);

                    // 이미지 소스 변환
                    let imgSrc = ParticipantImg;
                    if (role === "LEADER") {
                        imgSrc = LeaderImg;
                    }

                    // 변환 내용
                    let memberName = nickname;
                    if (isMe) {
                        memberName = nickname + " (나)";
                    }

                    const renderMemberStatus = () => {
                        if (isCompleted) {
                            return (
                                <span className={style['member-completed-text']}>
                                    {completedText}
                                </span>
                            );
                        }
                        if (isMe) {
                            return (
                                <Button
                                    type="input-response"
                                    size="button-fixed-sm"
                                    content={buttonContent}
                                    onClick={() => handleMovePage("SurveyPage")}
                                />
                            );
                        }
                        return (
                            <span className={style['member-pending-text']}>
                                {pendingText}
                            </span>
                        );
                    };

                    return (
                        <div key={item.id} className={style['member-block']}>
                            <div className={style['member-left-side']}>
                                <img src={imgSrc} className={style['member-icon']} />
                                <span className={style['member-name']}>{memberName}</span>
                            </div>
                            {renderMemberStatus()}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GroupInputProgress;
