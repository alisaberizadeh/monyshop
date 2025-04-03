import Link from 'next/link'
import React from 'react'

function Article() {
  return (
    <div className="col-span-1  bg-white p-4 rounded-sm  shadow-sm">

            <Link href="" className="w-full relative group">
                <img src="https://picsum.photos/800"
                    alt=""
                    className="w-full transition-all duration-300 hover:brightness-75"
                />

            </Link>

            <p className="font-black text-sm mt-4 flex items-center justify-between">
                <Link href="">Title </Link>
            </p>

            <Link href="" className="font-thin text-gray-700 text-sm mt-1">
            15 february 2025
            </Link>
            <Link href=""  className="text-sm mt-2 text-violet-500 block font-medium underline">Read This</Link>
        </div>
  )
}

export default Article