import {React, useState, useRef, useEffect} from 'react';

import close from '../assets/close.png'
import '../styles/App.css'
import '../styles/Game.css'
import '../styles/Inventory.css'


import Modal from 'react-modal';
import InventorySong from '../components/InventorySong';


function Game() {

  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  function resizeGame() {
    var gameArea = containerRef.current;
    var widthToHeight = 16/7;
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameArea.style.height = newHeight + 'px';
        gameArea.style.width = newWidth + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
        gameArea.style.width = newWidth + 'px';
        gameArea.style.height = newHeight + 'px';
    }
    
    gameArea.style.marginTop = (-newHeight / 2) + 'px';
    gameArea.style.marginLeft = (-newWidth / 2) + 'px';
    
    var gameCanvas = canvasRef.current;
    gameCanvas.width = newWidth;
    gameCanvas.height = newHeight;
  }
  


const [x, setX] = useState(50);

function draw() {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext("2d");
	ctx.fillStyle = "blue";
	ctx.fillRect(x, 50, 100, 20)
}


useEffect(() => {
  window.focus()
  resizeGame()
  draw();
}, []);

window.addEventListener('resize', resizeGame, false);
// window.addEventListener("keydown", keyPress);
window.addEventListener('orientationchange', resizeGame, false);

const [songs, setSongs] = useState([
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Like Real People Do',
    artist: 'Hozier',
    duration: '3:28'
  }
])
const totalSongs = 29
const [modalShow, setModalShow] = useState(false)
const [songShow, setSongShow] = useState(true)
const [currSong, setCurrSong] = useState(songs[0])

  return (
    <div 
      id='game-container'
      ref = {containerRef}
      style={{
        // width: window.innerWidth,
        // height: window.innerHeight,
        // marginTop: (-window.innerHeight / 2),
        // marginLeft: (-window.innerWidth / 2),
        overflow: 'hidden'
      }}
      onKeyDown={(e) => {
        if(e.key === 'ArrowLeft') {
        	setX(x-10)
        }
        else if(e.key === 'ArrowRight') {
        	setX(x+10)
        }
        console.log(e.key,x)
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();

      }}
    >
      <button className="button game-button" onClick={() => {setModalShow(true)}}>
        <span className='button-text'>Inventory ({songs.length}/{totalSongs})</span>
      </button>
    <Modal 
      isOpen={modalShow}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          margin: '1vw 7vw',
          border: 'none',
          background: 'none',
          height: '100vh',
          outline: 'none',
          padding: '0'
        }
      }}
    >
        <div className='inventory-frame'>
          <button className='inventory-button' onClick={()=>{setModalShow(false)}}>
            <img style={{width: '3vw', imageRendering: 'pixelated'}} src={close}></img>
          </button>
          <div className='heading'>SONGS COLLECTED ({songs.length}/{totalSongs})</div>
          <div className='inventory-list'>
            {songs.map((song, index) => <InventorySong song={song} index={index}></InventorySong>)}
          </div>
        </div> 
    </Modal>
    <Modal 
      isOpen={songShow}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          margin: '1vw 7vw',
          border: 'none',
          background: 'none',
          height: '100vh',
          outline: 'none',
          padding: '0'
        }
      }}
    >
        <div className='song-frame'>
            <div>
                <div className='heading'>You found a song!</div>
                <button className="button" onClick={() => {setSongShow(false)}}>
                    <span className='button-text'>Continue</span>
                </button>
            </div>
            <div>
                <img className='song-img-large' src={currSong.url}></img>
                <div>
                    <div>{currSong.title}</div>
                    <div className='small'>{currSong.artist}</div>
                </div>
            </div>
            
        </div> 
    </Modal>
    <canvas 
      ref = {canvasRef}
      id="game-canvas"
      width={window.innerWidth}
      height={window.innerHeight}
      tabIndex={0}
    ></canvas>
    </div>

  );
}

export default Game;