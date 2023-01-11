import React, { useEffect, useState } from 'react';
import './index.css'

function SmallCard(props:any) {

    const [name,setName] = useState("?")
    const [img,setImg] = useState("whosWhite.png")

    useEffect(() =>{
        setName(props.name)
        setImg(props.img);

    },[props])

    return ( 
        <div className='small_card'>
                <img src = {require('../../assets/images/'+img)} alt={name} />
        </div>
 
        
     );
}

export default SmallCard;