import {React, useState, useRef, useEffect} from 'react';

import close from '../assets/close.png'
import girl from '../assets/girl.png'

import grass from '../assets/grass.svg'
import rock1 from '../assets/rock1.png'


import '../styles/App.css'
import '../styles/Game.css'
import '../styles/Inventory.css'


import Modal from 'react-modal';
import InventorySong from '../components/InventorySong';


function Game() {

const [x, setX] = useState(12);
const latestX = useRef(x)

const width = 4;
const [arr, setArr] = useState(Array.from({length: 100/width}, () => new Array(100/width).fill('')));
const latestArr = useRef(arr)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getPlayerPos() {
  const h = window.innerHeight;
  const w = window.innerWidth;

  const sizePx = w/(100/width);
  const numRows = Math.round(h/sizePx);

  console.log('getPlayerPos')

  return numRows-2;

}

const y = getPlayerPos()

function movePlayer(key) {
  let arrCopy = [...latestArr.current]
  arrCopy[y][latestX.current] = 'person';
  if(key == 'ArrowLeft') {
    arrCopy[y][latestX.current+1] = '';
  }
  else {
    arrCopy[y][latestX.current-1] = '';
  }
  setArr(() => {
    latestArr.current = arrCopy;
    return arrCopy;
  });
}

function moveObjects() {
  let arrCopy = [...latestArr.current]
  // move person up to compensate
  arrCopy[y-1][latestX.current] = 'person';
  arrCopy[y][latestX.current] = '';

  let newRow = arrCopy.pop()
  shuffleArray(newRow)
  arrCopy.unshift(newRow)

  // setArr(arrCopy);
  setArr(() => {
    latestArr.current = arrCopy;
    return arrCopy;
  });
}

function keyPressed(e){
    if(e.key === 'ArrowRight' && latestX.current < 24) {
        if(latestArr.current[y][latestX.current + 1] == '' || latestArr.current[y][latestX.current + 1] == 'grass') {
          setX(prev => {
              latestX.current = prev + 1;
              return prev + 1;
            });
            movePlayer(e.key)
        }
    }
    else if(e.key === 'ArrowLeft' && latestX.current > 0 ) {
      if(latestArr.current[y][latestX.current - 1] == '' || latestArr.current[y][latestX.current - 1] == 'grass') {
        setX(prev => {
            latestX.current = prev - 1;
            return prev - 1;
          });
          movePlayer(e.key)
        }
    }
    else if(e.key === 'ArrowUp' && (latestArr.current[y-1][latestX.current] == '' || latestArr.current[y-1][latestX.current] == 'grass')) {
      moveObjects()
    }
  }

function draw() {
    let arrCopy = [...arr]
    arrCopy[y][x] = 'person';
    const initialItems = {'grass': 6, 'rock1': 6}
    for(const item in initialItems) {
      let counter = 0;
      while(counter < initialItems[item]) {
        //choose random spot
        const randomRow = Math.floor(Math.random() * arrCopy.length)
        const randomCol = Math.floor(Math.random() * arrCopy[0].length)
        //if spot is not taken, place item
        if(arrCopy[randomRow][randomCol] == '') {
          arrCopy[randomRow][randomCol] = item;
          counter++;
        }
      }
    }
    setArr(arrCopy);
}

useEffect(() => {
    draw();
    window.addEventListener("keydown", keyPressed);
}, []);

// window.addEventListener('resize', resizeGame, false);
// window.addEventListener("keydown", keyPress);
// window.addEventListener('orientationchange', resizeGame, false);

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
const [inventoryShow, setInventoryShow] = useState(false)
const [songShow, setSongShow] = useState(false)
const [currSong, setCurrSong] = useState(songs[0])


  return (
    <div id='game-container'>
      <button className="button game-button" onClick={() => {setInventoryShow(true)}}>
        <span className='button-text'>Inventory ({songs.length}/{totalSongs})</span>
      </button>
    <Modal 
      isOpen={inventoryShow}
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
          <button className='inventory-button' onClick={()=>{setInventoryShow(false)}}>
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
    <div id="game-play">
      {arr.map((row) => row.map((item) => <div className={'square ' + item}></div>))}
    </div>
    </div>

  );
}

export default Game;