"use client"
import React, { useEffect, useState } from 'react';
import * as fa from "react-icons/fa6";
import Link from 'next/link';
import { IProduct } from '@/lib/types';
import Product from '@/components/product/Product';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/container/Container';

function Shop() {
  const [loader, setLoader] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch("http://alisab.ir/products");
        const data = await res.json();
        setProducts(data);
        setLoader(false);
      }
      catch (err) {
        console.error('Error:', err);
      }
    };
    getProducts()

  }, []);

  return (
    <Container>
      <div className='w-full mb-5'>
        <p className='dark:text-myTextDark text-center my-8 rounded-full font-sans text-2xl tracking-widest flex items-center justify-start'>
          <fa.FaAnglesRight className='text-base' /><span className='mx-2'> Shop</span>
        </p>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10'>
          {products.map((item: IProduct, index: number) => (
            <Product key={index} name={item.name} image={item.image} price={item.price} category={item.category_id} id={item.id}  quantity={item.quantity}  />
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

       
      </div>
    </Container>

  );
}

export default Shop