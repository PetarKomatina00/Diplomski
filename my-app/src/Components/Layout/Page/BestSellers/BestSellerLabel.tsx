import React from 'react'
import "./BestSellerLabel.css"
function BestSellerLabel() {
    return (
        <div className='label' >
            <i className="bi bi-info-circle "></i>
            <span>Trending Now</span>
            <span className='tooltiptext'>This is dynamically updated.</span>
        </div>

    )
}

export default BestSellerLabel
