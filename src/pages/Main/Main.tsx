import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';
import { useSearchCharactersQuery } from '../../api/starWarsApi';
import Search from '../../components/Search/Search';
import CardList from '../../components/CardList/CardList';
import Loader from '../../components/Loader/Loader';
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
  const selectedId = searchParams.get('details');

  const {
    data: characters = [],
    isLoading,
    error,
  } = useSearchCharactersQuery({ searchTerm, page });

  const renderContent = () =>
    !isLoading &&
    !error && (
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
    );

  return (
    <div className={styles.container}>
      <div
        className={`${styles.main} ${theme === 'dark' ? styles.dark : styles.light}`}
      >
        <ThemeToggle />
        <h1 className={styles.title}>Star Wars Characters</h1>
        <Search onSearch={(query) => navigate(`/?query=${query}&page=1`)} />
        {isLoading && <Loader />}
        {error && <p className={styles.error}>Failed to load characters</p>}
        {renderContent()}
        <Pagination totalPages={5} />
      </div>
      <Footer />
    </div>
  );
};

export default Main;
