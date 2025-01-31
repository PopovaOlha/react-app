import { Component } from 'react';
import styles from './ThrowErrorButton.module.css';

class ThrowErrorButton extends Component {
  throwError = (): void => {
    console.error('Test Console Error: Something went wrong!');
    throw new Error('Test Error: Button Click Error!');
  };

  render(): JSX.Element {
    return (
      <button className={styles.throwErrorButton} onClick={this.throwError}>
        Throw Error
      </button>
    );
  }
}

export default ThrowErrorButton;
