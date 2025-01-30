import React, { Component } from 'react';
import styles from './MusicPlayer.module.css';
import { MusicPlayerState } from '../../interfaces/interfaces';

class MusicPlayer extends Component<object, MusicPlayerState> {
  private audioRef = React.createRef<HTMLAudioElement>();
  private tracks: string[] = [
    "../../../public/music/Star Wars- The Imperial March (Darth Vader's Theme).mp3",
    '../../../public//music/03 Imperial Attack.mp3',
    '../../../public/music/08 The Battle Of Endor III.mp3',
  ];

  constructor(props: object) {
    super(props);
    this.state = {
      isPlaying: false,
      volume: 0.5,
      currentTrackIndex: this.getRandomTrackIndex(),
    };
  }

  private getRandomTrackIndex = (): number => {
    return Math.floor(Math.random() * this.tracks.length);
  };

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

  handleTrackEnd = (): void => {
    this.setState({ currentTrackIndex: this.getRandomTrackIndex() }, () => {
      if (this.audioRef.current) {
        this.audioRef.current.play();
      }
    });
  };

  componentDidMount(): void {
    const audio = this.audioRef.current;
    if (audio) {
      audio.play();
    }
  }

  componentWillUnmount(): void {
    const audio = this.audioRef.current;
    if (audio) {
      audio.pause();
    }
  }

  render(): JSX.Element {
    const { currentTrackIndex, isPlaying, volume } = this.state;

    return (
      <div className={styles.musicPlayer}>
        <button
          onClick={this.handlePlayPause}
          className={styles.playPauseButton}
        >
          <span className={styles.icon}>🎶</span>
          {isPlaying ? 'Pause' : 'Play'}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={this.handleVolumeChange}
          className={styles.volumeSlider}
        />

        <audio ref={this.audioRef} loop autoPlay onEnded={this.handleTrackEnd}>
          <source src={this.tracks[currentTrackIndex]} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

export default MusicPlayer;
