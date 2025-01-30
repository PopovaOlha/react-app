import { Component } from 'react';
import { fetchCharacters } from '../../api/starWarsApi.ts';
import CardList from '../../components/CardList/CardList';
import Search from '../../components/Search/Search';
import Loader from '../../components/Loader/Loader';
import { Character } from '../../interfaces/interfaces';
import styles from './Main.module.css';

class Main extends Component {
  state = {
    characters: [] as Character[],
    loading: false,
    error: '',
  };

  async fetchAndSetCharacters(searchTerm: string = ''): Promise<void> {
    this.setState({ loading: true, error: '' });
    try {
      const characters = await fetchCharacters(searchTerm);
      this.setState({ characters, loading: false });
    } catch (error) {
      console.error(error);
      this.setState({ error: 'Failed to load characters', loading: false });
    }
  }

  componentDidMount(): void {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.fetchAndSetCharacters(savedSearchTerm);
  }

  handleSearch = (searchTerm: string): void => {
    this.fetchAndSetCharacters(searchTerm);
  };

  render(): JSX.Element {
    const { characters, loading, error } = this.state;

    return (
      <div className={styles.main}>
        <h1 className={styles.title}>Star Wars Characters</h1>

        <Search onSearch={this.handleSearch} />

        {loading && <Loader />}
        {error && <p className={styles.error}>{error}</p>}
        {!loading && !error && <CardList characters={characters} />}
      </div>
    );
  }
}

export default Main;
