import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCharacters } from '../../api/starWarsApi';
import styles from './CharacterDetails.module.css';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../interfaces/interfaces';

const CharacterDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(id);
        setCharacter(data[0]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const closeDetails = () => {
    navigate(-1);
  };

  if (loading) return <Loader />;
  if (!character) return null;

  return (
    <div className={styles.details}>
      <button className={styles.closeButton} onClick={closeDetails}>
        ✖
      </button>
      <h2>{character.name}</h2>
      <p>{character.description}</p>
      <img src={character.image} alt={character.name} />
    </div>
  );
};

export default CharacterDetails;
