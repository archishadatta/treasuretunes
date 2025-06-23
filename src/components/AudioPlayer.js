import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

function AudioPlayer({ url, isPlaying, onPlay, onPause, audioRef }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateProgress = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(isNaN(percent) ? 0 : percent);
    };

    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, [audioRef]);

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    const audio = audioRef?.current;
    if (audio && audio.duration) {
      audio.currentTime = (newProgress / 100) * audio.duration;
      setProgress(newProgress);
    }
  };

  const handleToggle = () => {
    if (isPlaying) {
      onPause();
    } else {
      onPlay(url);
    }
  };

  return (
    <div className='audio-player'>
      <button
        onClick={handleToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5vw',
          padding: 0,
          color: '#333'
        }}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>

      <input
        type="range"
        className='progress-bar'
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        style={{
          background: `linear-gradient(to right, #3C2A2A ${progress}%, #CC613D ${progress}%)`,
        }}
      />
    </div>
  );
}

export default AudioPlayer;
