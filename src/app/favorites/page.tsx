"use client"
import Container from '@/components/container/Container';
import { Skeleton } from '@/components/ui/skeleton';
import { FavoritesContext } from '@/context/FavoritesContext';
import { IProduct } from '@/lib/types';
import axios from 'axios';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { FaAnglesRight, FaTrash } from 'react-icons/fa6';

function Page() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const {handleFavorites , favorites} = useContext(FavoritesContext)
  const handleFavorite = (id: number) => {
    handleFavorites(id);
  };
  useEffect(() => {
    const fetchFavorites = async () => {
      if (!favorites) return;

      const favoritesArray: number[] = favorites;

      try {
        const responses = await Promise.all(
          favoritesArray.map(id => axios.get(`https://realalisaberi.ir/products/show/${id}`))
        );
        const productsData = responses.map(res => res.data);
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [favorites]);
  
   

  return (
    <Container>
      <div className="py-8 min-h-screen ">
        <p className='dark:text-myTextDark text-center my-8 rounded-full font-sans text-2xl tracking-widest flex items-center justify-start'>
          <FaAnglesRight className='text-base' /><span className='mx-2'>  Favorites</span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-10">

          {products.length > 0 ? (
            products.map((item: IProduct, index: number) => (
            <div key={index} className="col-span-1 bg-white dark:bg-bgDark2 p-4 rounded-sm shadow-sm">
              <Link href={`/shop/${item.id}`} className="w-full relative group">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full transition-all duration-300 hover:brightness-75"
                />
              </Link>

              <p className="font-black text-sm mt-4 flex items-center justify-between">
                <Link href={`/shop/${item.id}`} className="dark:text-white">{item.name}</Link>
                <button onClick={()=>handleFavorites(item.id)} className='text-white bg-red-600 rounded-sm p-2'><FaTrash /></button>
              </p>

              <p className="text-sm mt-2 flex items-center">
                <span className="font-black text-orange-600 dark:text-orange-500"> ${item.price}</span>
              </p>

            </div>
          ))
          ) : (
            Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="col-span-1 flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[250px]" />
              </div>
            </div>
          ))
          )}

        </div>
      </div>
    </Container>
  );
}

export default Page;


