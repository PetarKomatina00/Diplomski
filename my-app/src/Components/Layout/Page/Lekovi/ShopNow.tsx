import React from 'react'
import "./ShopNow.css"
import { useNavigate } from 'react-router-dom'
function ShopNow() {
    const navigate = useNavigate();
    const navigateFunction = () =>{
        navigate("/LekoviLista");
    }
    return (
        <div className='clickable-div' onClick={navigateFunction}>
            <i className="bi bi-megaphone"></i>
            <span>Januar Daily Deals!</span>
            <button className='shop-now-button btn btn-warning'>Shop Now</button>
        </div>
    )
}

export default ShopNow