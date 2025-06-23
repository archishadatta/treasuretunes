import React, { useRef, useState } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';

import clock from "../assets/clock.svg";
import mystery from "../assets/mystery.svg";

import '../styles/App.css';
import '../styles/Inventory.css';

// Utility to format MM:SS
function formatDuration(duration) {
  const [minutes, seconds] = duration.split(':').map(Number);
  return `${Math.floor(minutes)}:${Math.floor(seconds).toString().padStart(2, '0')}`;
}

function InventorySong(props) {
  const { song, index, onPlay, onPause, isPlaying, currentUrl } = props;
  const isThisPlaying = isPlaying && currentUrl === song.previewUrl;


  // Locked/unrevealed song
  if (song == null) {
    return (
      <div className='song-container'>
        <div>{index + 1}.</div>
        <img className='song-img' src={mystery} alt="Mystery" />
      </div>
    );
  }

  return (
    <div className='song-container'>
      <div>{index + 1}.</div>

      <div className="image-wrapper" onClick={(e) => {
              e.stopPropagation();
              if (isThisPlaying) {
                onPause();
              } else {
                onPlay(song.previewUrl);
              }
            }}>
        <img className="song-img" src={song.url} alt={song.title} />
        <div className="overlay">
          {isThisPlaying ? <FaPause className="icon"/> : <FaPlay className="icon" />}
        </div>
      </div>

      <div style={{ textAlign: 'left' }}>
        <div>{song.title}</div>
        <div className='small'>{song.artist}</div>
      </div>

      <img style={{ height: '2vw' }} src={clock} alt="Clock" />
      <div className='small'>{formatDuration(song.duration)}</div>

      
    </div>
  );
}

export default InventorySong;
