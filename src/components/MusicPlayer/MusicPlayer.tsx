import { Component, createRef } from 'react';
import styles from './MusicPlayer.module.css';

interface MusicPlayerState {
  isPlaying: boolean;
}

class MusicPlayer extends Component<object, MusicPlayerState> {
  private audioRef = createRef<HTMLAudioElement>();

  constructor(props: object) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }

  handlePlayPause = () => {
    const audio = this.audioRef.current;
    if (audio) {
      if (audio.paused) {
        audio.play();
        this.setState({ isPlaying: true });
      } else {
        audio.pause();
        this.setState({ isPlaying: false });
      }
    }
  };

  render() {
    return (
      <div className={styles.musicPlayer}>
        <button
          onClick={this.handlePlayPause}
          className={styles.playPauseButton}
        >
          <span className={styles.icon}>🎶</span>
          {this.state.isPlaying ? 'Pause' : 'Play'}
        </button>
        <audio ref={this.audioRef} loop>
          <source
            src="../../../public/music/Star Wars- The Imperial March (Darth Vader's Theme).mp3"
            type="audio/mp3"
          />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default MusicPlayer;
