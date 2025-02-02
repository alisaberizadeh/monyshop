"use client"
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; import 'swiper/css/navigation';
import Link from 'next/link';
import { Navigation } from 'swiper/modules';
function Slider() {
    return (
        <Swiper className="mySwiper" spaceBetween={20} autoplay={{ delay: 3000 }} modules={[Navigation]} navigation={true}>
            <SwiperSlide><Link href=""><img className='w-full rounded-xl h-full' src="https://img.freepik.com/premium-vector/special-offer-final-sale-banner-red-background-illustration_275806-121.jpg" alt="" /></Link> </SwiperSlide>
            <SwiperSlide><Link href=""><img className='w-full rounded-xl h-full' src="https://img.freepik.com/premium-vector/special-offer-final-sale-banner-red-background-illustration_275806-121.jpg" alt="" /></Link> </SwiperSlide>
            <SwiperSlide><Link href=""><img className='w-full rounded-xl h-full' src="https://img.freepik.com/premium-vector/special-offer-final-sale-banner-red-background-illustration_275806-121.jpg" alt="" /></Link> </SwiperSlide>
            <SwiperSlide><Link href=""><img className='w-full rounded-xl h-full' src="https://img.freepik.com/premium-vector/special-offer-final-sale-banner-red-background-illustration_275806-121.jpg" alt="" /></Link> </SwiperSlide>
        </Swiper>
    )
}

export default Slider