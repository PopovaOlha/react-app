import { Component } from 'react';
import Card from '../Card/Card';
import styles from './CardList.module.css';
import { CardProps } from '../../interfaces/interfaces';

interface CardListProps {
  characters: CardProps['character'][];
}

class CardList extends Component<CardListProps> {
  render(): JSX.Element {
    const { characters } = this.props;
    return (
      <div className={styles.cardList}>
        {characters.map((character) => (
          <Card key={character.id} character={character} />
        ))}
      </div>
    );
  }
}

export default CardList;
