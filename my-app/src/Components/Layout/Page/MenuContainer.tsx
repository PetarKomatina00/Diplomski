import React, { useState } from 'react'
import './MenuContainer.css'

const MenuContainer = ({ getActiveIndex, images, isMouseEnter, isMouseLeave}: any, ) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [getImage, setGetImage] = useState("");

    // /static/media/prva.8587a6601da959195a4f.png

    const imageParts = []
    const imageNameWithExtension = []
    const fileNames = []
    for(let i = 0; i < images.length; i++){
        imageParts[i] = images[i].split("/")
        const temp = imageParts[i]
        imageNameWithExtension[i] = temp[imageParts[i].length - 1]
        fileNames[i] = imageNameWithExtension[i].split('.')[0]
        fileNames[i] = decodeURIComponent(fileNames[i])
    }
    return (

        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center " id="navbarNav" >
                    <ul className="navbar-nav" >
                        {
                            fileNames.map((fileName : any, index : number) => (
                                <li key = {index} className='nav-item' onMouseEnter={isMouseEnter} onMouseLeave={isMouseLeave} onMouseOver={() => getActiveIndex(index + 1)}>
                                    <a 
                                    className={`nav-link ${index === 1 ? "active" : ""}`} 
                                    href = "#">{fileName}</a>
                                </li>
                            ))
                        }
                        {/* <li className="nav-item" onMouseOver={() => getActiveIndex(1)} >
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        <li className="nav-item" onMouseOver={() => getActiveIndex(2)}>
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item" onMouseOver={() => getActiveIndex(3)}>
                            <a className="nav-link" href="#">Pricing</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="#" aria-disabled="true">Disabled</a>
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default MenuContainer