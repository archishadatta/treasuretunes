import {React, useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import Typed from 'react-typed';

import '../styles/nongame.css'
import '../styles/App.css';


function TextPage(props) {

    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
      }

const [showBtn, setShowBtn] = useState(false)

  return (
    <div className='nongame-container'>
       <div className='nongame-frame'>
        {/* <p className="nongame-text">{props.fullText}</p> */}
        <Typed
            startDelay={2000}
            strings={[props.fullText]}
            style={{fontSize: "calc(1rem + 1.5vw)"}}
            typeSpeed={130}
            onComplete={() => {delay(2000).then(() => setShowBtn(true));}}
        />
        
        {showBtn && 
        <div>
            <br></br>
            {props.buttonText == 'Start' ?
              <Link to='/game' className="nongame-text button wide animated">
              <span className='animated-text'>{props.buttonText}</span>
              </Link>
             :
              <a href={props.url} className="nongame-text button wide animated">
                  <span className='animated-text'>{props.buttonText}</span>
              </a>
            }
        </div>}
        </div> 
    </div>
    

  );
}

export default TextPage;