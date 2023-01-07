import {React, useState} from 'react';
import './styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import Intro from './pages/Intro'
import Game from './pages/Game'
import Game2 from './pages/Game2'
import End from './pages/End'



function App() {

  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/" element={<Intro fullText="Hi Eva! Your girlfriend, Archie, made you a playlist of all the songs that remind her of you. Unfortunately, there was a storm last night and your songs were scattered all across Tunelandia. You must search the island to complete your playlist. Good luck!" buttonText="Start"/>}> </Route>
            <Route path="/game" element={<Game2 />}> </Route>
            <Route path="/end" element={<Intro fullText="Congratulations! You have journeyed across Tunelandia and collected all your songs. Great work, explorer." buttonText="View Playlist"/>}> </Route>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
