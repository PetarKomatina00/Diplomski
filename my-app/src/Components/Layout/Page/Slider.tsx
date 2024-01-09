import React, { useEffect } from 'react'
import { useState } from 'react'
import './SlidingMenu.css'
function Slider({ images }: any) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }
    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 3000)
        return () => clearTimeout(timer);
    }, [currentImageIndex])
    return (
        <div className='slider'>
            <div className='image-preview'>
                <img src={images[currentImageIndex]} alt="Neka slika"></img>
            </div>
            <div className='image-list'>
                {
                    images.map((image : any, index : any) => (
                        <div
                            key={index}
                        >
                        </div>
                    ))
                }

            </div>
        </div>
    )
}

export default Slider