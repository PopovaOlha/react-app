import { Outlet, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchCharacters } from '../../api/starWarsApi';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../interfaces/interfaces';
import styles from './Main.module.css';
import Footer from '../../components/Footer/Footer';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('query') || '';
  const page = Number(searchParams.get('page')) || 1;
  const selectedId = searchParams.get('details');

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [totalPages, setTotalPages] = useState(1);

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

  const handleLeftSectionClick = () => {
    navigate(`/?query=${searchTerm}&page=${page}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <h1 className={styles.title}>Star Wars Characters</h1>
        <Search
          onSearch={(searchTerm: string) =>
            navigate(`/?query=${searchTerm}&page=1`)
          }
        />
        {loading && <Loader />}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && (
          <div className={styles.content}>
            <div
              className={styles.leftSection}
              onClick={handleLeftSectionClick}
            >
              <CardList
                characters={characters}
                loading={loading}
                error={error}
              />
            </div>
            {selectedId && (
              <div className={styles.rightSection}>
                <Outlet />
              </div>
            )}
          </div>
        )}
        <Pagination totalPages={totalPages} />
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
export default Main;
