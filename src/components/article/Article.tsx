import Link from 'next/link'
import React from 'react'

function Article() {
  return (
    <div className="col-span-1  bg-white dark:bg-bgDark2 pb-5  rounded-2xl  shadow-sm">

            <Link href="" className="w-full relative group">
                <img src="https://picsum.photos/800"
                    alt=""
                    className="w-full transition-all duration-300 hover:brightness-75 rounded-t-2xl"
                />

            </Link>

            <div className='px-5'>
            <p className="font-black text-sm mt-4 flex items-center justify-between">
            <Link href="" className="dark:text-white">Title </Link>
            </p>

            <p className="font-thin text-gray-700 dark:text-myTextDark text-sm mt-1">
            15 february 2025
            </p>
            <Link href=""  className="text-sm mt-2 text-violet-500 block font-medium underline">Read This</Link>
            </div>
        </div>
  )
}

export default Article