import { Component } from 'react';
import Main from '../../pages/Main/Main';
import Footer from '../Footer/Footer';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import styles from './App.module.css';

class App extends Component {
  render(): JSX.Element {
    return (
      <>
        <div className={styles.app}>
          <ErrorBoundary>
            <Main />
            <Footer />
          </ErrorBoundary>
        </div>
      </>
    );
  }
}
export default App;
