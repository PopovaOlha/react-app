import { Component } from 'react';
import styles from './Card.module.css';
import { CardProps } from '../../interfaces/interfaces';

class Card extends Component<CardProps> {
  render(): JSX.Element {
    const { character } = this.props;
    return (
      <div className={styles.card}>
        <img
          className={character.image}
          src={character.image}
          alt={character.name}
        />
        <h3 className={styles.name}>{character.name}</h3>
        <p className={styles.description}>{character.description}</p>
      </div>
    );
  }
}
export default Card;
