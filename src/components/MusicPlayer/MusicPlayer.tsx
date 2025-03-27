import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';
import { DEFAULT_VOLUME } from '../../config/constants';

const tracks = [
  "/music/Star Wars- The Imperial March (Darth Vader's Theme).mp3",
  '/music/03 Imperial Attack.mp3',
  '/music/08 The Battle Of Endor III.mp3',
];

const getRandomTrackIndex = () => Math.floor(Math.random() * tracks.length);

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(
    () => localStorage.getItem('isPlaying') === 'true'
  );
  const [volume, setVolume] = useState(() =>
    parseFloat(localStorage.getItem('volume') || DEFAULT_VOLUME)
  );

  const [currentTrackIndex, setCurrentTrackIndex] =
    useState(getRandomTrackIndex);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(console.error);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(event.target.valueAsNumber);
  };

  const handleTrackEnd = () => {
    setCurrentTrackIndex(getRandomTrackIndex());
  };

  useEffect(() => {
    localStorage.setItem('isPlaying', String(isPlaying));
    localStorage.setItem('volume', String(volume));
  }, [isPlaying, volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = tracks[currentTrackIndex];
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className={styles.musicPlayer}>
      <button onClick={handlePlayPause} className={styles.playPauseButton}>
        <span className={styles.icon}>🎶</span>
        {isPlaying ? 'Pause' : 'Play'}
      </button>

      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
        className={styles.volumeSlider}
      />

      <audio ref={audioRef} onEnded={handleTrackEnd} />
    </div>
  );
};

export default MusicPlayer;
