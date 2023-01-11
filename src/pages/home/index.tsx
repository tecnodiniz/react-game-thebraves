import React from "react";
import './index.css';
import { Link } from 'react-router-dom'



function Home() {
   
    return ( 
    <div className="container">
        <div className="container-title">
            <h1>The Braves</h1>
        </div>

        <div className="menu">
            <ul>
                <li className="disabled">
                    Start Game
                </li>
                <li>
                    <Link to="/free-game">Free Game</Link>
                </li>
                <li>How to play</li>
            </ul>
        </div>
 
        
    </div>);
}

export default Home;