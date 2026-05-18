import { CarSvg, PulseSvg, WalletSvg } from '@/assets/svg/ResultsSvgs';
import { conflictCards } from '@/constants/conflictCards';
import styles from './ConflictList.module.scss';

const ConflictIcon = ({ type }) => {
  if (type === 'wallet') return <WalletSvg />;
  if (type === 'pulse') return <PulseSvg />;
  return <CarSvg />;
};

const ConflictList = () => {
  return (
    <div className={styles['results-conflict-list']}>
      {conflictCards.map((card) => (
        <article
          key={card.id}
          className={`${styles['conflict-card']} ${
            card.compact ? styles['conflict-card-compact'] : ''
          }`}
        >
          <div className={styles['conflict-icon']}>
            <ConflictIcon type={card.icon} />
          </div>
          <div className={styles['conflict-copy']}>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            {card.bullets ? (
              <div className={styles['conflict-bullets']}>
                {card.bullets.map((bullet) => (
                  <p key={bullet}>{bullet}</p>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );
};

export default ConflictList;
