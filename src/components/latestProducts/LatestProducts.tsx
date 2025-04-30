"use client";
import React, { useEffect, useState } from 'react';
import * as fa from "react-icons/fa6";
import Product from '../product/Product';
import Link from 'next/link';
import { Skeleton } from '../ui/skeleton';
import { IProduct } from '@/lib/types';

function LatestProducts() {
  const [loader, setLoader] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://alisab.ir/products");
        const data = await res.json();
        setProducts(data.slice(0, 10));
        setLoader(false);
      }
      catch (err) {
        console.error('Error:', err);
      }
    };
    getProducts()

  }, []);

  return (
    <div className='w-full'>
      <p className='dark:text-myTextDark text-center my-8 rounded-full font-sans text-2xl tracking-widest flex items-center justify-start'>
        <fa.FaAnglesRight className='text-base' /><span className='mx-2'>Latest Products</span>
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        {products.map((item: IProduct, index: number) => (
           <Product key={index} name={item.name} image={item.image} price={item.price} category={item.category_id} id={item.id} quantity={item.quantity} />
        ))}
        {loader &&
          Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="col-span-1 flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          ))
        }
      </div>

      <div className='text-center my-10'>
        <Link href="" className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 inline-flex items-center">
          More Products <fa.FaCirclePlus className='ml-2' />
        </Link>
      </div>
    </div>
  );
}

export default LatestProducts;
