import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { fetchCharacterDetails } from '../../api/starWarsApi';
import { Character, CharacterDetailsProps } from '../../interfaces/interfaces';
import Loader from '../../components/Loader/Loader';
import styles from './CharacterDetails.module.css';

const CharacterDetails: React.FC<CharacterDetailsProps> = ({
  searchTerm,
  page,
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');

  const [characterDetails, setCharacterDetails] = useState<Character | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Character ID is missing in the URL.');
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchCharacterDetails(id);
        setCharacterDetails(data);
      } catch (err) {
        console.error('Error fetching character details:', err);
        setError('Failed to load character details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  if (loading) return <Loader />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!characterDetails) return <p>No details available for this character.</p>;

  const closeDetails = () => {
    navigate(`/?query=${searchTerm}&page=${page}`);
  };

  return (
    <div className={styles.details}>
      <button className={styles.closeButton} onClick={closeDetails}>
        ✖
      </button>
      <h2>{characterDetails.name}</h2>
      <p>{characterDetails.description}</p>
      <img src={characterDetails.image} alt={characterDetails.name} />
      <p>
        <strong>Gender:</strong> {characterDetails.gender}
      </p>
      <p>
        <strong>HairColor:</strong> {characterDetails.hairColor}
      </p>
      <p>
        <strong>Height:</strong> {characterDetails.height}
      </p>
      <p>
        <strong>HomeWorld:</strong> {characterDetails.homeworld}
      </p>
      <div></div>
    </div>
  );
};

export default CharacterDetails;
