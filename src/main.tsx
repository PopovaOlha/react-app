import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App.tsx';
import MusicPlayer from './components/MusicPlayer/MusicPlayer.tsx';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <MusicPlayer />
  </StrictMode>
);
