import {React, useState} from 'react';
import './styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import TextPage from './pages/TextPage'
import Game2 from './pages/Game2'



function App() {

  const url = 'https://open.spotify.com/playlist/78sqF0EkkevvyhCG1oD3kQ?si=13b27f152ff64170'
  

  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/" element={<TextPage fullText="Hi Eva! Your girlfriend, Archie, made you a playlist of all the songs that remind her of you. Unfortunately, there was a storm last night and your songs were scattered all across Tunelandia. You must search the island to complete your playlist. Good luck!" buttonText="Start"/>}> </Route>
            <Route path="/game" element={<Game2 />}> </Route>
            <Route path="/end" element={<TextPage fullText="Congratulations! You have journeyed across Tunelandia and collected all your songs. Great work, explorer." buttonText="View Playlist" url={url}/>}> </Route>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
