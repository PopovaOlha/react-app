import { useState } from 'react';
import styles from './Search.module.css';
import { SearchProps } from '../../interfaces/interfaces';

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || ''
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const trimmedTerm = searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    onSearch(trimmedTerm);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.input}
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search for a character..."
      />
      <button className={styles.button} onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default Search;
