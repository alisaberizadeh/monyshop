import React from 'react'
import * as fa from "react-icons/fa6";
import Link from 'next/link';
import Article from '../article/Article';

function LatestArticles() {
  return (
    <div className='w-full '>
      <p className='dark:text-myTextDark my-8 rounded-full font-sans text-2xl  tracking-widest flex items-center justify-start'>
        <fa.FaAnglesRight className='text-base' />
        <span className='mx-2'>Latest Articles</span>

      </p>


      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10'>
        <Article />
        <Article />
        <Article />
        <Article />
        
      </div>
      <div className='text-center my-10'>
      <Link href="" className=" text-white bg-gradient-to-br from-violet-600 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm lg:text-lg px-10 py-2.5 text-center inline-flex items-center"> More Articles<fa.FaCirclePlus className='ml-2' /> </Link>

      </div>

    </div>
  )
}

export default LatestArticles