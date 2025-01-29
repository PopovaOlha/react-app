import { Component } from 'react';
import styles from './Search.module.css';
import { SearchProps, SearchState } from '../../interfaces/interfaces';

class Search extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.state = { searchTerm: savedSearchTerm };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: e.target.value });
  };

  handleSearch = () => {
    const trimmedTerm = this.state.searchTerm.trim();
    localStorage.setItem('searchTerm', trimmedTerm);
    this.props.onSearch(trimmedTerm);
  };

  render() {
    return (
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
          placeholder="Search for a character..."
        />
        <button className={styles.button} onClick={this.handleSearch}>
          Search
        </button>
      </div>
    );
  }
}

export default Search;
