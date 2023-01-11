import React from 'react';
import './index.css';

function InfoBox(props:any) {
    return (
        <div className='info_box'>
            <p>{props.message}</p>
        </div>
    );
}

export default InfoBox;