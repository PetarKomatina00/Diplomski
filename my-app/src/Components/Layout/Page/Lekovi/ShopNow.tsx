import React from 'react'
import "./ShopNow.css"
import { useNavigate } from 'react-router-dom'
import Timer from './Timer';
function ShopNow() {
    return (
        <div className=''>
            <div className=''>
                <div className='clickable-div ' >
                    <Timer />
                </div>
            </div>
        </div>

    )
}
export default ShopNow