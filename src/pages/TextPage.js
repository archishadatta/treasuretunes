import {React, useState} from 'react';
import { Link, useSearchParams } from "react-router-dom";
import Typed from 'react-typed';

import '../styles/nongame.css'
import '../styles/App.css';


function TextPage(props) {

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }

const [showBtn, setShowBtn] = useState(false)
const [searchParams] = useSearchParams();
const to = searchParams.get("to");
const from = searchParams.get("from");

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
              <Link to={`/game?playlist=${searchParams.get("playlist")}`} className="nongame-text button wide animated">
              <span className='animated-text'>{"Start"}</span>
              </Link>
             
        </div>}
        </div> 
    </div>
    

  );
}

export default TextPage;