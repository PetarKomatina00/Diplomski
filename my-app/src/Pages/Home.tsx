import React from 'react'
import LekoviLista from '../Components/Layout/Page/Lekovi/LekoviLista'
import Slider from '../Components/Layout/Page/Slider'
import BestSellers from '../Components/Layout/Page/BestSellers/BestSellers';

let prva = require('../Assets/Images/prva.png');
let druga = require('../Assets/Images/treca.png');
let treca = require('../Assets/Images/druga.png');
function Home() {
  const images = [
    `${prva}`,
    `${druga}`,
    `${treca}`
  ]
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className = "container" >
        <Slider images={images} />
        <div >
        <BestSellers/>
        <LekoviLista />
        </div>
      </div>
    </div>
  )
}

export default Home