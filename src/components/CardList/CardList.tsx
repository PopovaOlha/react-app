import { CardListProps } from '../../interfaces/interfaces';
import Card from '../Card/Card';
import styles from './CardList.module.css';

const CardList: React.FC<CardListProps> = ({ characters, onCardClick }) => {
  return (
    <div className={styles.cardList}>
      {characters.map((character) => (
        <Card key={character.id} character={character} onClick={onCardClick} />
      ))}
    </div>
  );
};

export default CardList;
