import React, { useState } from 'react'
import './MenuContainer.css'
const MenuContainer = ( {getActiveIndex } : any ) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    return (
        <div className='menu-container'>
            <div className='menu-block' 
            onMouseEnter={() => setActiveIndex(1)}
            onMouseOver={() => getActiveIndex(1)}>
                <div className='menu-title'>SPORTS NUTRITION</div>
                <div className='menu-subtitle'>20% OFF</div>
                <a href='#' className='menu-action'>LEARN MORE</a>
            </div>
            <div className='menu-block'
            onMouseEnter={() => setActiveIndex(2)}
            onMouseOver={() => getActiveIndex(2)}>
                <div className='menu-title'>ASHWAGANDHA</div>
                <div className='menu-subtitle'>24% OFF</div>
                <a href='#' className='menu-action'>LEARN MORE</a>
            </div>
            <div className='menu-block'
            onMouseEnter={() => setActiveIndex(3)}
            onMouseOver={() => getActiveIndex(3)}>
                <div className='menu-title'>SUPPLEMENTS FOR STRESS</div>
                <div className='menu-subtitle'></div>
                <a href='#' className='menu-action'>LEARN MORE</a>
            </div>
        </div>
    )
}

export default MenuContainer