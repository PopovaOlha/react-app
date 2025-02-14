import React from 'react';
import { useSelector } from 'react-redux'; // Import useSelector
import { RootState } from '../../store/store'; // Import RootState for typing
import { CardListProps, Character } from '../../interfaces/interfaces';
import Card from '../Card/Card';
import Flyout from '../Flyout/Flyout';
import styles from './CardList.module.css';

const CardList: React.FC<CardListProps> = ({ characters, onCardClick }) => {
  // Extract selectedCharacters from Redux state
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedItems.selectedCharacters
  );

  if (characters.length === 0) {
    return <div>No characters found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.cardList}>
        {characters.map((character: Character) => (
          <Card
            key={character.id}
            character={character}
            onClick={onCardClick}
          />
        ))}
        {/* Conditionally render Flyout if there are selected characters */}
        {selectedCharacters.length > 0 && <Flyout />}
      </div>
    </div>
  );
};

export default CardList;
