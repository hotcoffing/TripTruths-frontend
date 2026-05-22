import style from "./GroupInputProgress.module.scss";
import LeaderImg from "@/assets/Leader.svg"
import ParticipantImg from "@/assets/Participant.svg"
import Button from "@/components/common/Button"

function GroupInputProgress({myId, memberList, handleMovePage}) {
    const progressInfoText = "입력 현황";
    const completeMembers = memberList.filter(
        // 객체 프로퍼티 명은 DB 내용 참고
        (member) => member.is_survey_complete 
    );
    const progressCount = `${completeMembers.length}/${memberList.length}`;

    return (
        <div className={style['progress-wrapper']}>
            <div className={style['progress-info-container']}>
                <span className={style['progress-info']}>{progressInfoText}</span>
                <span className={style['progress-count']}>{progressCount}</span>
            </div>
            <div className={style['progress-member-container']}>
                {memberList.map((item) => {
                    // 정적 텍스트 내용
                    const buttonContent = "내 응답 입력하기 →";
                    const completedText = "완료"

                    // 객체 프로퍼티 명은 DB 내용 참고
                    const nickname = item.nickname;
                    const role = item.role;
                    const isCompleted = item.is_survey_complete;

                    // 변환 내용
                    const imgSrc = (role === "leader") ? LeaderImg : ParticipantImg;
                    const memberName = nickname + (item.id === myId ? " (나)" : "");

                    return (
                        <div key={item.id} className={style['member-block']}>
                            <div className={style['member-left-side']}>
                                <img src={imgSrc} className={style['member-icon']} />
                                <span className={style['member-name']}>{memberName}</span>
                            </div>
                            {!isCompleted ?
                                <Button
                                    type="input-response"
                                    size="button-fixed-sm"
                                    content={buttonContent}
                                    onClick={() => handleMovePage("SurveyPage")}
                                /> : <span className={style['member-completed-text']}>{completedText}</span>
                            }
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default GroupInputProgress;