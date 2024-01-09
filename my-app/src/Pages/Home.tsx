import React from 'react'
import LekoviLista from '../Components/Layout/Page/Lekovi/LekoviLista'
import Slider from '../Components/Layout/Page/Slider'

let prva = require('../Assets/Images/prva.png');
let druga = require('../Assets/Images/druga.png');
let treca = require('../Assets/Images/treca.png');
function Home() {
  const images = [
    `${prva}`,
    `${druga}`,
    `${treca}`
  ]
  return (
    <div>
      <div className='container p-2'>
        <Slider images={images} />
        <LekoviLista />
      </div>
    </div>
  )
}

export default Home