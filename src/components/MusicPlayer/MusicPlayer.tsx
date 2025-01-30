import React, { Component } from 'react';
import styles from './MusicPlayer.module.css';
import { MusicPlayerState } from '../../interfaces/interfaces';

class MusicPlayer extends Component<object, MusicPlayerState> {
  private audioRef = React.createRef<HTMLAudioElement>();

  constructor(props: object) {
    super(props);
    this.state = {
      isPlaying: false,
      volume: 0.5,
    };
  }

  handlePlayPause = (): void => {
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

  handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const newVolume = Number(event.target.value);
    this.setState({ volume: newVolume });

    if (this.audioRef.current) {
      this.audioRef.current.volume = newVolume;
    }
  };

  render(): JSX.Element {
    return (
      <div className={styles.musicPlayer}>
        <button
          onClick={this.handlePlayPause}
          className={styles.playPauseButton}
        >
          <span className={styles.icon}>🎶</span>
          {this.state.isPlaying ? 'Pause' : 'Play'}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={this.state.volume}
          onChange={this.handleVolumeChange}
          className={styles.volumeSlider}
        />

        <audio ref={this.audioRef} loop autoPlay>
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
