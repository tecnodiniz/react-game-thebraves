import React from 'react';
import styled from 'styled-components';
// import styled, { DefaultTheme } from 'styled-components';


interface Bar {
    width:number
}

const Life = styled.div<Bar>`
    height:50px;
    width:${props => props.width || 3}%;
    background-color:green;

`
function LifeBar(props:any) {
    
    
    return ( 
    <div className='bar'>
        <Life width={props.life} ></Life>
    </div>
     );
}

export default LifeBar;