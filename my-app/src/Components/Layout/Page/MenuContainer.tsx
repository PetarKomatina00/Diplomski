import React from 'react'
import './MenuContainer.css'
function MenuContainer() {
    return (
        <div className='menu-container'>
            <div className='menu-block'>
                <div className='menu-title'>SPORTS NUTRITION</div>
                <div className='menu-subtitle'>20% OFF</div>
                <a href='#' className='menu-action'>LEARN MORE</a>
            </div>
            <div className='menu-block'>
                <div className='menu-title'>ASHWAGANDHA</div>
                <div className='menu-subtitle'>24% OFF</div>
                <a href='#' className='menu-action'>LEARN MORE</a>
            </div>
            <div className='menu-block'>
                <div className='menu-title'>SUPPLEMENTS FOR STRESS</div>
                <div className='menu-subtitle'></div>
                <a href='#' className='menu-action'>LEARN MORE</a>
            </div>
        </div>
    )
}

export default MenuContainer