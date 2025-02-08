import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchCharacterDetails } from '../../api/starWarsApi';
import { Character } from '../../interfaces/interfaces';
import Loader from '../../components/Loader/Loader';

const CharacterDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('details');

  const [characterDetails, setCharacterDetails] = useState<Character | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log(`Fetching details for character ID: ${id}`);
        const data = await fetchCharacterDetails(id);
        console.log('Fetched data:', data);

        setCharacterDetails(data);
      } catch (err) {
        console.error('Error fetching character details:', err);
        setError('Failed to load character details.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!characterDetails) return <p>No details available.</p>;

  return (
    <div>
      <h2>{characterDetails.name}</h2>
      <p>{characterDetails.description}</p>
      <img src={characterDetails.image} alt={characterDetails.name} />
    </div>
  );
};

export default CharacterDetails;
