import './index.css'
import React from 'react';
import styled, { Bar }from 'styled-components';



const Time = styled.div<Bar>`
    height:10px;
    width:${props => props.width || 100}%;
    background-color:blue;

`;

function TimeBar(props:any) {

    return (<div className='bar'><Time width={props.time}></Time> </div>);
}

export default TimeBar;
