import styles from './Search.module.css';
import { SearchProps } from '../../interfaces/interfaces';
import { useStoredSearchQuery } from '../../hooks/useStoredSearchQuery';
import useTheme from '../../hooks/useTheme';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useStoredSearchQuery();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    onSearch(trimmedTerm);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={`${styles.input} ${theme === 'dark' ? styles.dark : styles.light}`}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search for a character..."
        data-testid="search-input"
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
