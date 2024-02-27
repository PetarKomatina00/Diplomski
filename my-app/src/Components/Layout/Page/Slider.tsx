import React, { useEffect } from 'react'
import { useState } from 'react'
import './SlidingMenu.css'
import { ArrowBigLeft, ArrowBigRight, Circle, CircleDot, HeadingIcon } from 'lucide-react'
import MenuContainer from './MenuContainer'
import { current } from '@reduxjs/toolkit'
import "./SlidingMenu.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import MainLoader from './Lekovi/Common/MainLoader'
type ImageSliderProps = {
    images: string[]
}


const Slider = ({ images }: ImageSliderProps) => {
    //console.log(images);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const imageURL: any = []
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

    const getActiveIndexFromMenuContainer = (index: number) => {
        setCurrentImageIndex(index - 1);
    }

    const fja = () => {
        images.map((image : any) => {
           //console.log(extractFileName(image))
        })
    }

    return (
        // <div className=''>
        //     <div className='slider'>
        //         <div className='image-preview' style={{ position: "relative" }}>
        //             <img src={images[currentImageIndex]} alt="Neka slika"></img>
        //             {/* <button className='image-slider-btn' style={{ left: 0 }} onClick={prevImage}><ArrowBigLeft /></button>
        //             <button className='image-slider-btn' style={{ right: 0 }} onClick={nextImage}><ArrowBigRight /></button> */}
        //         </div>
        //         <MenuContainer getActiveIndex={getActiveIndexFromMenuContainer} />
        //         <div className='image-list' style={{ overflow: "hidden"}}>
        //             {
        //                 images.map((image: any, index: any) => (
        //                     <div className='img'
        //                         key={index}
        //                     >
        //                     </div>
        //                 ))
        //             }
        //         </div>
        //     </div>
        // </div>


        // <div className="slider">
        //     <div className="slides">
        //         {
        //             images.map((image: any, index: any) => (
        //                 <div className='slide' key={index} style={{ display: index === currentImageIndex ? 'block' : "" }}>
        //                     <img src={image}></img>
        //                 </div>
        //             ))
        //         }
        //     </div>
        //     <div className='button-slider'>
        //         <button className="prev" onClick={prevImage}>❮</button>
        //         <button className="next" onClick={nextImage}>❯</button>
        //     </div>

        //     <MenuContainer getActiveIndex={getActiveIndexFromMenuContainer} />
        // </div>
        <>
            {(
                <div id="carouselExampleSlidesOnly" className="carousel-slide" data-bs-ride="carousel">
                    <button className='btn btn-warning' onClick={fja}>CLICK</button>
                    <div className="carousel-indicators">
                        {images.map((image: any, idx: number) => (
                            <button key={idx} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={idx}
                                className={idx === currentImageIndex ? 'active' : ''}
                                aria-current={idx === currentImageIndex ? 'true' : 'false'}
                                aria-label={`Slide ${idx + 1}`}></button>
                        ))}

                    </div>
                    <div className="carousel-inner">
                        {images.map((image: any, idx: number) => (
                            <div key={idx} className={`carousel-item ${idx === currentImageIndex ? 'active' : ''}`}>
                                <img src={image} className="d-block w-100" alt={`Slide ${idx}`} />
                            </div>
                        ))}
                    </div>
                    <MenuContainer getActiveIndex={getActiveIndexFromMenuContainer} images={images} />
                </div>
            )}
        </>

    )
}

export default Slider
