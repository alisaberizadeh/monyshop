import React from 'react'
import { BiBadgeCheck } from 'react-icons/bi'
import { FaBoxOpen, FaCreditCard, FaHeadset } from 'react-icons/fa6'

function ShopBenefits() {
    return (
        <div className='w-full grid grid-cols-1 lg:grid-cols-4 gap-5 bg-white dark:bg-bgDark2 rounded-xl px-5 py-10'>
            <div className='col-span-1 flex items-center justify-center  text-lg text-gray-500'><BiBadgeCheck className='mr-2 text-2xl' />Product warranty</div>
            <div className='col-span-1 flex items-center justify-center text-lg text-gray-500  '><FaCreditCard className='mr-2 text-2xl' />Payment on site</div>
            <div className='col-span-1 flex items-center justify-center text-lg text-gray-500  '><FaHeadset className='mr-2 text-2xl' />24 hour support</div>
            <div className='col-span-1 flex items-center justify-center  text-lg text-gray-500'><FaBoxOpen className='mr-2 text-2xl' />Express delivery</div>
        </div>
    )
}

export default ShopBenefits