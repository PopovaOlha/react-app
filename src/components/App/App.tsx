import { Component } from 'react';
import './App.module.css';
import Search from '../Search/Search';

class App extends Component {
  render() {
    return (
      <Search
        onSearch={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    );
  }
}
export default App;
