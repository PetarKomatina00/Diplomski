import React, { useEffect, useState } from 'react'
import LekoviLista from '../Components/Layout/Page/Lekovi/LekoviLista'
import Slider from '../Components/Layout/Page/Slider'
import ShopNow from '../Components/Layout/Page/Lekovi/ShopNow';
import BestSellerLabel from '../Components/Layout/Page/BestSellers/BestSellerLabel';
import BestSellers from '../Components/Layout/Page/BestSellers/BestSellers';
import { ImageMinus } from 'lucide-react';

let prva = require('../Assets/Images/Heart Healt.png');
let druga = require('../Assets/Images/Making Wellness Better.png');
let treca = require('../Assets/Images/Ashwagangha.png');

function Home() {

  const [images, SetImages] = useState([])
  // const images = [
  //   `${prva}`,
  //   `${druga}`,
  //   `${treca}`
  // ]

  useEffect(() => {
    fetch('https://diplomskiapi.azurewebsites.net/api/Lek/GetAllBlobURL')
      .then(response => {
        if (!response.ok) {
          console.log("Error fetching data")
        }
        return response.json();
      }).then(data => {
        //console.log(data)
        SetImages(data);
      })
  }, [])



  return (
    <div className="">
      <div className="" >
        <div className='text-center'>
          <ShopNow />
        </div>
        <div className=''>
          <Slider images={images} />
        </div>
        <div className=''>
          <BestSellers />
        </div>
      </div>
    </div>
  )
}

export default Home