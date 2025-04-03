import Link from 'next/link'
import React from 'react'

function Categories() {
  return (
    <div className='w-full  grid grid-cols-6 gap-7 mt-7 mb-10'>

        <Link href="" className='col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm'>
            <p className='font-extralight lg:text-xl text-lg  tracking-widest dark:text-gray-300' >Wristwatch</p>
        </Link>

        <Link href="" className='col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm'>
            <p className='font-extralight lg:text-xl text-lg  tracking-widest dark:text-gray-300' >Necklace</p>
        </Link>

        <Link href="" className='col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm'>
            <p className='font-extralight lg:text-xl text-lg  tracking-widest dark:text-gray-300' >Earrings</p>
        </Link>

        <Link href="" className='col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm'>
            <p className='font-extralight lg:text-xl text-lg  tracking-widest dark:text-gray-300'  >Bracelet</p>
        </Link>

        <Link href="" className='col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm'>
            <p className='font-extralight lg:text-xl text-lg  tracking-widest dark:text-gray-300' >Glasses</p>
        </Link>

        <Link href="" className='col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm'>
            <p className='font-extralight lg:text-xl text-lg  tracking-widest dark:text-gray-300' >Hat</p>
        </Link>

 

    </div>
  )
}

export default Categories