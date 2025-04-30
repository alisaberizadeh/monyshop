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
      <Link href="" className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center"> More Articles<fa.FaCirclePlus className='ml-2' /> </Link>

      </div>

    </div>
  )
}

export default LatestArticles