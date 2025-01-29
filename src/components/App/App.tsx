import { Component } from 'react';
import styles from './App.module.css';
import Search from '../Search/Search';

class App extends Component {
  render() {
    return (
      <div className={styles.container}>
        <Search
          onSearch={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </div>
    );
  }
}
export default App;
