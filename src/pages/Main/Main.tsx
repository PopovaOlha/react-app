import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCharacters } from '../../api/starWarsApi';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../interfaces/interfaces';
import styles from './Main.module.css';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import Pagination from '../../components/Pagination/Pagination';
import ThemeToggle from '../../components/ThemeToggle/ThemeToggle';
import Footer from '../../components/Footer/Footer';
import useTheme from '../../hooks/useTheme';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();

  const searchTerm = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const selectedId = searchParams.get('details');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchCharacters(searchTerm, page);
        setCharacters(data);
        setTotalPages(5);
      } catch {
        setError('Failed to load characters');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, page]);

  return (
    <div className={styles.main}>
      <ThemeToggle />
      <h1
        className={`${styles.title} ${theme === 'dark' ? styles.dark : styles.light}`}
      >
        Star Wars Characters
      </h1>
      <Search onSearch={(query) => navigate(`/search?query=${query}&page=1`)} />
      {loading && <Loader />}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && (
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <CardList
              characters={characters}
              onCardClick={(id) =>
                navigate(`/?query=${searchTerm}&page=${page}&details=${id}`)
              }
            />
          </div>
          {selectedId && (
            <div className={styles.rightSection}>
              <Outlet />
              <CharacterDetails searchTerm={searchTerm} page={page} />
            </div>
          )}
        </div>
      )}
      <Pagination totalPages={totalPages} />
      <Footer />
    </div>
  );
};

export default Main;
