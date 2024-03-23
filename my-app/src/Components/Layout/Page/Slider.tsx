import React, { useEffect } from 'react'
import { useState } from 'react'
import './SlidingMenu.css'
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot, HeadingIcon } from 'lucide-react'
import MenuContainer from './MenuContainer'
import { current } from '@reduxjs/toolkit'
import "./SlidingMenu.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import MainLoader from './Lekovi/Common/MainLoader'
import { To } from 'react-router-dom'
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types'
type ImageSliderProps = {
    images: string[]
}


const Slider = ({ images }: ImageSliderProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [isMouseOver, setIsMouseOver] = useState<boolean>(false);
    let timer: TimeoutId
    useEffect(() => {
        timer = setTimeout(() => {
            if (images.length === 0) return 0;
            if (!isMouseOver) setCurrentImageIndex((prev) => (prev + 1) % images.length)
        }, 3000)
        if(isMouseOver) return () => clearTimeout(timer);
    }, [currentImageIndex])

    const getActiveIndexFromMenuContainer = (index: number) => {
        //console.log(index);
        setCurrentImageIndex(index - 1);
    }
    const handleIsMouseEnter = (e: any) => {
        //console.log("True")
        setIsMouseOver(true);
    }
    const handleIsMouseLeave = (e : any) => {
        //console.log("False")
        setIsMouseOver(false);
    }
    return (
        <>
            {(
                <div id="carouselExampleSlidesOnly" className="carousel-slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {images.map((image: any, idx: number) => (
                            <div key={idx} className={`carousel-item ${idx === currentImageIndex ? 'active' : ''}`}>
                                <img src={image} className="d-block w-100" alt={`Slide ${idx}`} />
                            </div>
                        ))}
                    </div>
                    <MenuContainer getActiveIndex={getActiveIndexFromMenuContainer}
                        images={images}
                        isMouseEnter = {handleIsMouseEnter}
                        isMouseLeave = {handleIsMouseLeave}
                    />
                </div>
            )}
        </>

    )
}

export default Slider
