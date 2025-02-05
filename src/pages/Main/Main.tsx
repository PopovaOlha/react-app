import { useState, useEffect } from 'react';
import { fetchCharacters } from '../../api/starWarsApi.ts';
import CardList from '../../components/CardList/CardList';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../interfaces/interfaces';
import styles from './Main.module.css';

const Main: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAndSetCharacters = async (searchTerm: string = '') => {
    setLoading(true);
    setError('');

    try {
      const characters = await fetchCharacters(searchTerm);
      setCharacters(characters);
    } catch (error) {
      console.error(error);
      setError('Failed to load characters');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    fetchAndSetCharacters(savedSearchTerm);
  }, []);

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>Star Wars Characters</h1>
      <Search onSearch={fetchAndSetCharacters} />
      {loading && <Loader />}
      {!loading && !error && <CardList characters={characters} />}
    </div>
  );
};

export default Main;
