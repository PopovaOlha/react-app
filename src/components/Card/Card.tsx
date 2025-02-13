import styles from './Card.module.css';
import { CardProps } from '../../interfaces/interfaces';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Card: React.FC<CardProps> = ({ character }) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get('query') || '';
  const page = searchParams.get('page') || '1';

  const handleClick = () => {
    navigate(`/?query=${searchTerm}&page=${page}&details=${character.id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
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
