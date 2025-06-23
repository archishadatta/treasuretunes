import {React} from 'react';
import './styles/App.css';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import TextPage from './pages/TextPage'
import Game2 from './pages/Game2'
import Create from './pages/Create'
import End from './pages/End'




function App() {

  const url = 'https://open.spotify.com/playlist/78sqF0EkkevvyhCG1oD3kQ?si=13b27f152ff64170'
  

  return (
    <div className="App">
       <Router>
          <Routes>
            <Route path="/intro" element={<TextPage/>}> </Route>
            <Route path="/game" element={<Game2 />}> </Route>
            <Route path="/" element={<Create />}> </Route>
            <Route path="/end" element={<End fullText="Congratulations! You have journeyed across Tunelandia and collected all your songs. Great work, explorer." url={url}/>}> </Route>
          </Routes>
    </Router>
    </div>
  );
}

export default App;
