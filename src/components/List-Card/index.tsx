import React from 'react';
import './index.css';


function ListCard(props:any) {

    const characters:[{
        id:'',
        name:'',
        profile:''
    }] = props.characters    
  
    return (
         <div className='box'>
            <div className='card_select'>
                {characters.map((char => (
                    <div className='card' key={char.id} onClick ={event => (props.sendId(char.id,char.name,char.profile)) }>
                        <img src={require('../../assets/images/'+char.profile)} alt={char.name} />
                    </div>
            )))}
            </div>
        </div>

    );
}

export default ListCard;