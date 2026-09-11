import {React, useState, useEffect} from 'react';
import { Link, useSearchParams } from "react-router-dom";
import Typed from 'react-typed';

import '../styles/nongame.css'
import '../styles/App.css';

import { loadPlaylist } from '../utils/playlistLoader';


function TextPage(props) {

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }

const [showBtn, setShowBtn] = useState(false)
const [playlistReady, setPlaylistReady] = useState(false)
const [playlistFailed, setPlaylistFailed] = useState(false)
const [searchParams] = useSearchParams();
const to = searchParams.get("to");
const from = searchParams.get("from");
const playlistId = searchParams.get("playlist");

// Start fetching the playlist as soon as the intro loads, so it's
// ready by the time the typing animation finishes instead of making
// the player wait on the game screen.
useEffect(() => {
    if (!playlistId) return;
    let cancelled = false;
    loadPlaylist(playlistId)
        .then(() => { if (!cancelled) setPlaylistReady(true); })
        .catch(err => {
            console.error("Error fetching playlist:", err);
            if (!cancelled) setPlaylistFailed(true);
        });
    return () => { cancelled = true; };
}, [playlistId]);

  return (
    <div className='nongame-container'>
       <div className='nongame-frame'>
        <Typed
            startDelay={2000}
            strings={[`Hi ${to}! ${from} made you a playlist. Unfortunately, there was a storm last night and your songs were scattered all across Tunelandia. You must search the island to complete your playlist. Good luck!`]}
            style={{fontSize: "calc(1rem + 1.5vw)"}}
            typeSpeed={200}
            onComplete={() => {delay(2000).then(() => setShowBtn(true));}}
        />

        {showBtn &&
        <div>
            <br></br>
              {playlistFailed ? (
                <div className='nongame-text'>Couldn't load the playlist. Try refreshing the page.</div>
              ) : playlistReady ? (
                <Link to={`/game?playlist=${playlistId}`} className="nongame-text button wide animated">
                <span className='animated-text'>{"Start"}</span>
                </Link>
              ) : (
                <div className='nongame-text loading-text'>
                  <span className='loading-spinner' aria-hidden="true"></span>
                  Loading your playlist...
                </div>
              )}
        </div>}
        </div>
    </div>


  );
}

export default TextPage;