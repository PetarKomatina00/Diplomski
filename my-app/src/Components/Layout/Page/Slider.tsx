import React, { useEffect } from 'react'
import { useState } from 'react'
import './SlidingMenu.css'

import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot } from 'lucide-react'
import MenuContainer from './MenuContainer'
type ImageSliderProps = {
    images: string[]
}
function Slider({ images }: ImageSliderProps) {
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

    const getActiveIndexFromMenuContainer = (index : number) => {
        setCurrentImageIndex(index - 1);
    }
    return (
        <div className='slider'>
            <div className='image-preview' style={{ position: "relative" }}>
                <img src={images[currentImageIndex]}
                    alt="Neka slika"
                ></img>
                <button className='image-slider-btn' style={{ left: 0 }} onClick={prevImage}><ArrowBigLeft /></button>
                <button className='image-slider-btn' style={{ right: 0 }} onClick={nextImage}><ArrowBigRight /></button>
            </div>
            {/* <div style={{
                position: "absolute",
                top : "18.5rem",
                display : "flex",
                gap : ".5rem"
            }}>
                {images.map((_, index) => (
                    <button onClick={() => setCurrentImageIndex(index)} className='img-slider-dot-btn'>{index === currentImageIndex ? <CircleDot/> : <Circle/>}</button>
                ))}
            </div> */}
            <MenuContainer getActiveIndex = {getActiveIndexFromMenuContainer}/>
            <div className='image-list' style={{ overflow: "hidden" }}>
                {
                    images.map((image: any, index: any) => (
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
