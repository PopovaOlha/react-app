import styles from './Card.module.css';
import { CardProps } from '../../interfaces/interfaces';

const Card: React.FC<CardProps> = ({ character, onClick }) => {
  return (
    <div className={styles.card} onClick={() => onClick(character.id)}>
      <img
        className={styles.image}
        src={character.image}
        alt={character.name}
      />
      <h3 className={styles.name}>{character.name}</h3>
      <p className={styles.description}>{character.description}</p>
    </div>
  );
};

export default Card;
