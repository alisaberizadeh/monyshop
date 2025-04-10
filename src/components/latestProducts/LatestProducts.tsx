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
        const res = await fetch("http://127.0.0.1:8000/products");
        const data = await res.json();
        setProducts(data.slice(0, 10));
        setLoader(false);
      }
      catch (err) {
        console.error('Error:', err);
      }
    };

    setTimeout(getProducts, 1500);
  }, []);

  return (
    <div className='w-full'>
      <p className='dark:text-myTextDark text-center my-8 rounded-full font-sans text-2xl tracking-widest flex items-center justify-start'>
        <fa.FaAnglesRight className='text-base' /><span className='mx-2'>Latest Products</span>
      </p>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
        {products.map((item: IProduct, index: number) => (
           <Product key={index} name={item.name} image={item.image} price={item.price} category={item.category_id} id={item.id} />
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
        <Link href="" className="text-white bg-gradient-to-br from-violet-600 to-violet-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm lg:text-lg px-10 py-2.5 text-center inline-flex items-center">
          More Products <fa.FaCirclePlus className='ml-2' />
        </Link>
      </div>
    </div>
  );
}

// function ProductWithCategory({ product }: { product: IProduct }) {
//   const [categoryName, setCategoryName] = useState<string | null>(null);

//   useEffect(() => {
//     const getCategoryName = async () => {
//       try {
//         const res = await fetch(`http://127.0.0.1:8000/categories/${product.category_id}`);
//         const data = await res.json();
//         setCategoryName(data.name);
//       } catch (err) {
//         console.error('خطا:', err);
//       }
//     };

//     getCategoryName();
//   }, [product.category_id]);

//   return (
//     <Product
//       name={product.name}
//       image={product.image}
//       price={product.price}
//       category={categoryName || "در حال بارگذاری..."}
//     />
//   );
// }

export default LatestProducts;
