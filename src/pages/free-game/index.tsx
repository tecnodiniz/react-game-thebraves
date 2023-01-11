import React, { useEffect, useState } from 'react';
import ListCard from '../../components/List-Card';
import Characters from '../../assets/data/characters.json' 
import SmallCard from '../../components/Small-Card';
import './index.css';
import BattleCard from '../../container/Battle-Card';


function FreeGame() {
    const [selected,setSelected] = useState(false);
    //Player
    const [playerId,setPlayerId] = useState(0);
    const [playerName,setPlayerName] = useState("");
    const [playerProfile,setPlayerProfile] = useState("whosWhite.png");
    const [player, setPlayer] = useState(false);

    //Enemy
    const [enemyId,setEnemyId] = useState(0);
    const [enemyrName,setEnemyName] = useState("");
    const [enemyProfile,setEnemyProfile] = useState("whosWhite.png");
    const [enemy, setEnemy] = useState(false);

    //Game
    const [start, setStart] = useState(false);

    useEffect(() =>{
        if(player && enemy)
        setSelected(true);
        
    },[player,enemy]);

    

    const sendPlayer = (id:number,name:string,profile:string) =>{

        setPlayerId(id);
        setPlayerName(name);
        setPlayerProfile(profile);
        setPlayer(true);
    }
    const sendEnemy = (id:number,name:string,profile:string) =>{
       
        setEnemyId(id);
        setEnemyName(name);
        setEnemyProfile(profile);
        setEnemy(true);
    }

    const confirm = ():void => {
        console.log(`${playerId}\n${enemyId}`)
        setStart(true);

    }

    return (
        <div className='content'>
            {!start ? (<>
                <div className='player_select_section'>
            <div className='selected'>
            <SmallCard
            id = {playerId}
            name = {playerName}
            img = {playerProfile}
            />
            <h2>VS</h2>
            <SmallCard
            id = {enemyId}
            name = {enemyrName}
            img = {enemyProfile}
            />
            </div>
           
            <div className='content_char'>
                <div className='char_select'>
                    <h1>Warrior</h1>
                    <ListCard sendId = {sendPlayer} characters = {Characters.character} />
                </div>

                <div className='char_select'>
                    <h1>Enemy</h1>
                    <ListCard sendId = {sendEnemy} characters =  {Characters.enemies} />
                </div>
               
            </div>

            <div>
            {selected ? (<button className='btn-8-bit' onClick={confirm}>Start</button>): null}

            </div>


            </div>
            </>):
          
            <BattleCard/>

        }

        </div>
    );
}

export default FreeGame;