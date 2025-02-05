import { useState, useRef, useEffect } from 'react';
import styles from './MusicPlayer.module.css';

const tracks = [
  "/music/Star Wars- The Imperial March (Darth Vader's Theme).mp3",
  '/music/03 Imperial Attack.mp3',
  '/music/08 The Battle Of Endor III.mp3',
];

const getRandomTrackIndex = () => Math.floor(Math.random() * tracks.length);

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(
    localStorage.getItem('isPlaying') === 'true'
  );
  const [volume, setVolume] = useState(
    parseFloat(localStorage.getItem('volume') || '0.5')
  );
  const [currentTrackIndex, setCurrentTrackIndex] =
    useState(getRandomTrackIndex);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (audioRef.current.paused) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Playback error:', err));
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
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

    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [isPlaying, currentTrackIndex, volume]);

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

      <audio ref={audioRef} onEnded={handleTrackEnd}>
        <source src={tracks[currentTrackIndex]} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default MusicPlayer;
