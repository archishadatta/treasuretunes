import {React, useState, useRef, useEffect} from 'react';
import { Link } from "react-router-dom";
import UIfx from 'uifx'

import close from '../assets/close.png'
import girl from '../assets/girl.png'

import collect from '../assets/sounds/collect.mp3'
import bg from '../assets/sounds/background.mp3'


// import grass from '../assets/grass.svg'
// import rock1 from '../assets/rock1.png'


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

const [personState, setPersonState] = useState('idle')
const latestPersonState = useRef(personState)

const [modalOpen, setModalOpen] = useState('false')
const latestModalOpen = useRef(modalOpen)

const [songs, setSongs] = useState([
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 1',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 2',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 3',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 4',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 5',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 6',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 7',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 8',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 9',
    artist: 'Hozier',
    duration: '3:28'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/en/a/a0/Hozier_-_Hozier.png',
    title: 'Song 10',
    artist: 'Hozier',
    duration: '3:28'
  }
])
const [inventoryShow, setInventoryShow] = useState(false)
const [songShow, setSongShow] = useState(false)
const [currSong, setCurrSong] = useState(-1)
const latestCurrSong = useRef(currSong)

const ding = new UIfx(
  collect,
  {
    volume: 0.8, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)

const background = new UIfx(
  bg,
  {
    volume: 0.05, // number between 0.0 ~ 1.0
    throttleMs: 100
  }
)



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    } else {
      copy.push(elem)
    }
    }
  )
  return copy;
}

function fillArray(array) {

  let tempArr = deepCopy(array);

  for(let i = 0; i < tempArr.length; i++) {
    for(let j = 0; j < tempArr[0].length; j++) {
        if(tempArr[i][j] == 'bigtree5') {
          if(i>1) tempArr[i-2][j] = 'bigtree1'
          if(i > 1 && j < tempArr[0].length - 1) tempArr[i-2][j+1] = 'bigtree2'
          if(i > 0) tempArr[i-1][j] = 'bigtree3'
          if(i > 0 && j < tempArr[0].length - 1) tempArr[i-1][j+1] = 'bigtree4'
          if(j < tempArr[0].length - 1)tempArr[i][j+1] = 'bigtree6'
        }
        if(tempArr[i][j] == 'bigrock3') {
          if(i != 0) tempArr[i-1][j] = 'bigrock1'
          if(i != 0 && j != tempArr[0].length - 1) tempArr[i-1][j+1] = 'bigrock2'
          if(j != tempArr[0].length - 1)tempArr[i][j+1] = 'bigrock4'
        }
    }
  }
  return tempArr
}

function getPlayerPos() {
  const h = window.innerHeight;
  const w = window.innerWidth;

  const sizePx = w/(100/width);
  const numRows = Math.round(h/sizePx);

  // console.log('getPlayerPos')

  return numRows-2;

}

const [y, setY] = useState(getPlayerPos())

function collectSong() {
  // ding.play()

  setCurrSong(prev => {
    latestCurrSong.current = prev + 1;
    return prev + 1;
  });
  setSongShow(() => {
    setModalOpen(() =>{
        latestModalOpen.current = true
        return true
      }
    )
    return true
  })
}

function movePlayer(key, spot) {
  let arrCopy = [...latestArr.current]
  arrCopy[y][latestX.current] += 'person';
  if(key == 'ArrowLeft') {
    arrCopy[y][latestX.current+1] = arrCopy[y][latestX.current+1].replace('person', '').replace('chest', '');
  }
  else {
    arrCopy[y][latestX.current-1] = arrCopy[y][latestX.current-1].replace('person', '').replace('chest', '');
  }
  // console.log(arrCopy[y])
  setArr(() => {
    latestArr.current = arrCopy;
    return arrCopy;
  });
  if(spot == 'chest') {
    collectSong()
  }
}

function moveObjects(spot) {
  let arrCopy = [...latestArr.current]
  // move person up to compensate
  arrCopy[y-1][latestX.current] += 'person';
  arrCopy[y][latestX.current] = arrCopy[y][latestX.current].replace('person', '').replace('chest', '');

  let newRow = arrCopy.pop()
  //if you don't collect a treasure chest you lose it
  let index = newRow.indexOf('chest');

  if (index !== -1) {
      newRow[index] = '';
  }

  //chance of adding a treasure chest
  if(Math.random() < 0.1) {
    newRow[0] = 'chest'
  }
  shuffleArray(newRow)
  arrCopy.unshift(newRow)

  setArr(() => {
    latestArr.current = arrCopy;
    return arrCopy;
  });
  if(spot == 'chest') {
    collectSong()
  }
}

function keyPressed(e){
  // console.log(latestModalOpen.current)
  // if(latestModalOpen.current == 'false'){
    // console.log(latestPersonState.current)
    const arrCheck = fillArray(latestArr.current)
    if(e.key === 'ArrowRight' && latestX.current < 24) {
      const spot = arrCheck[y][latestX.current + 1]
        if(spot == '' || spot == 'grass' || spot == 'chest') {
          setX(prev => {
              latestX.current = prev + 1;
              return prev + 1;
            });
            // setPersonState(() => {
            //   latestPersonState.current = 'right';
            //   return 'right';
            // });
            movePlayer(e.key, spot)
        }
    }
    else if(e.key === 'ArrowLeft' && latestX.current > 0 ) {
      const spot = arrCheck[y][latestX.current - 1]
      if(spot == '' || spot == 'grass' || spot == 'chest') {
        setX(prev => {
            latestX.current = prev - 1;
            return prev - 1;
          });
          // setPersonState(() => {
          //   latestPersonState.current = 'left';
          //   return 'left';
          // });
          movePlayer(e.key, spot)
        }
    }
    else if(e.key === 'ArrowUp') {
      const spot = arrCheck[y-1][latestX.current]
      if(spot == '' || spot == 'grass' || spot == 'chest') {
        // setPersonState(() => {
        //   latestPersonState.current = 'forward';
        //   return 'forward';
        // });
        moveObjects(spot)
      }
    }
  // }
  }

function keyUp(e){
  console.log(e.key + ' up')
  setPersonState(() => {
    latestPersonState.current = 'idle';
    return 'idle';
  });
}

function draw() {
    let arrCopy = [...arr]
    arrCopy[y][x] = 'person';
    const initialItems = {'grass': 6, 'rock1': 3, 'rock2': 3, 'bush1': 3, 'bush2': 3, 'chest': 2, 'bigtree5': 3, 'bigrock3':3}
    for(const item in initialItems) {
      let counter = 0;
      while(counter < initialItems[item]) {
        //choose random spot (not on the edges)
        const randomRow = Math.floor(Math.random() * (arrCopy.length - 2) + 1)
        const randomCol = Math.floor(Math.random() * (arrCopy[0].length - 2) + 1)
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
    window.addEventListener("keyup", keyUp);
    // window.addEventListener('resize', setY(getPlayerPos()), false);
}, []);

// window.addEventListener('resize', setY(getPlayerPos()), false);
// window.addEventListener("keydown", keyPress);
// window.addEventListener('orientationchange', resizeGame, false);

// background.play()

  return (
    <div id='game-container'>
      <button className="button game-button" onClick={() => {setInventoryShow(() => {
        setModalOpen(() =>{
            latestModalOpen.current = true
            return true
          }
        )
        return true
      })}}>
        <span className='button-text'>Inventory ({latestCurrSong.current + 1}/{songs.length})</span>
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
          <button className='inventory-button' onClick={() => {setInventoryShow(() => {
            setModalOpen(() =>{
                latestModalOpen.current = false
                return false
              }
            )
            return false
          })}}>
            <img style={{width: '3vw', imageRendering: 'pixelated'}} src={close}></img>
          </button>
          <div className='heading'>SONGS COLLECTED ({latestCurrSong.current + 1}/{songs.length})</div>
          <div className='inventory-list'>
            {songs.map((song, index) => {
              if(index <= latestCurrSong.current) return <InventorySong song={song} index={index}></InventorySong>
              else return <InventorySong song={null} index={index}></InventorySong>
            })}
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
        {currSong == songs.length - 1 ?
            <div>
              <div className='heading'>You found the last song!</div>
              <Link to='/end' className="button">
                <span className='button-text'>Complete Journey</span>
              </Link>
            </div>
        :
            <div>
              <div className='heading'>You found a song!</div>
              <button className="button" onClick={() => {setSongShow(() => {
                setModalOpen(() =>{
                    latestModalOpen.current = false
                    return false
                  }
                )
                return false
              })}}>
                  <span className='button-text'>Continue</span>
              </button>
            </div>
        }
            <div>
                <img className='song-img-large' src={songs[Math.max(latestCurrSong.current, 0)].url}></img>
                <div>
                    <div>{songs[Math.max(latestCurrSong.current, 0)].title}</div>
                    <div className='small'>{songs[Math.max(latestCurrSong.current, 0)].artist}</div>
                </div>
            </div>
            
        </div> 
    </Modal>
    <div id="game-play">
      {
        fillArray(arr).map((row) => row.map((item) => 
           <div className={'square ' + item}></div>
        ))
      }
    </div>
    </div>

  );
}

export default Game;