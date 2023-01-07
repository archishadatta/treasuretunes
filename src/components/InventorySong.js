import React from 'react';

import { Link } from "react-router-dom";

import clock from "../assets/clock.svg"


import '../styles/App.css'
import '../styles/Inventory.css'


function InventorySong(props) {

  return (
    <div className='song-container'>
      <div>{props.index + 1}.</div>
      <img className='song-img' src={props.song.url}></img>
      <div style={{textAlign: 'left'}}>
        <div>{props.song.title}</div>
        <div className='small'>{props.song.artist}</div>
      </div>
      <img style={{height: '2vw'}} src={clock}></img>
      <div className='small'>{props.song.duration}</div>
    </div>

  );
}

export default InventorySong;