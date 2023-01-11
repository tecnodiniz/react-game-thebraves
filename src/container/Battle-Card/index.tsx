import React from 'react';
import './index.css'
import Actions from '../../components/Actions';
import InfoBox from '../../components/Info-Box';
import LifeBar from '../../components/Life-Bar';
import SmallCard from '../../components/Small-Card';
import TimeBar from '../../components/Time-Bar';

function BattleCard() {
    return ( 
    <div className='battle_content'>
        <div className="title">
            <h1>Turn 1</h1>
        </div>
       

            <TimeBar />
            <LifeBar life={100}/>
            <div className='enemy-side'>
            <SmallCard
            id = {10}
            name = {""}
            img = {"Bael.png"}
            />
            </div>
           
            <InfoBox message="Battle Log"/>

            
            <InfoBox message="Hit opponent with 10 dmg"/>
            <LifeBar life={100}/>
            <SmallCard
            id = {10}
            name = {""}
            img = {"bigodudo.png"}
            />
            <Actions/>
        
    </div>);
}

export default BattleCard;