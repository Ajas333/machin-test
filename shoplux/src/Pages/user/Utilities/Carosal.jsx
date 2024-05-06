import React from 'react'
import img1 from '../../../assets/Carosal/img1.jpg'
import img2 from '../../../assets/Carosal/img2.jpg'
import { Carousel } from "flowbite-react";


function Carosal() {
  return (
    <div className='h-56 sm:h-64 xl:h-80 2xl:h-2/4 purple'>
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel>
                <img src={img1} alt="..." />
                <img src={img2} alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
            </Carousel>
        </div>
        <h2>udutfygihoj</h2>
    </div>
  )
}

export default Carosal
