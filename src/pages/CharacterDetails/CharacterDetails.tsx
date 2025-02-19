import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetCharacterDetailsQuery } from '../../api/starWarsApi';
import Loader from '../../components/Loader/Loader';
import ErrorComponent from '../../components/ErrorComponent/ErrorComponent';
import styles from './CharacterDetails.module.css';
import useTheme from '../../hooks/useTheme';

const CharacterDetails: React.FC<{ searchTerm: string; page: number }> = ({
  searchTerm,
  page,
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details') as string;

  const {
    data: characterDetails,
    isLoading,
    error,
  } = useGetCharacterDetailsQuery(id, {
    skip: !id,
  });

  if (!id) {
    return <ErrorComponent message="Character ID is missing in the URL." />;
  }

  if (isLoading) return <Loader />;

  if (error) {
    return <ErrorComponent message="Failed to load character details." />;
  }

  if (!characterDetails) {
    return (
      <ErrorComponent message="No details available for this character." />
    );
  }

  const closeDetails = () => {
    navigate(`/?query=${searchTerm}&page=${page}`);
  };

  return (
    <div
      className={`${styles.details} ${theme === 'dark' ? styles.dark : styles.light}`}
    >
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
    </div>
  );
};

export default CharacterDetails;
