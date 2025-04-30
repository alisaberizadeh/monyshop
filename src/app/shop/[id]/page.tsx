'use client'

import Container from '@/components/container/Container';
import { ICategury, IProduct } from '@/lib/types';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BsCoin } from "react-icons/bs";
import * as ci from "react-icons/ci";
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { FavoritesContext } from '@/context/FavoritesContext';
import { FaCheck, FaRegHeart } from "react-icons/fa6";

function Page() {
    const { id } = useParams();

    const [value, setValue] = useState<number>(1);
    const [product, setProduct] = useState<IProduct>();
    const [cat, setCat] = useState<ICategury>();

    const { favorites, handleFavorites } = useContext(FavoritesContext);
    const isFavorite = favorites.includes(Number(id));
    

    const handleDecrease = () => {
        if (value > 1) setValue(value - 1);
    };

    const handleIncrease = () => {
        if (product) {
            if (value < product.quantity) {
                setValue(value + 1);
            }
        }
    };

    useEffect(() => {
        if (!id) return;

        const getData = async () => {
            try {
                const res = await axios.get(`http://alisab.ir/products/show/${id}`);
                setProduct(res.data);

                const cat_res = await axios.get(`http://alisab.ir/categories/${res.data.category_id}`);
                setCat(cat_res.data);
            } catch (error) {
                console.error('Error :', error);
            }
        };

        getData();
    }, [id]);

    const handleFavorite = (id: number) => {
        handleFavorites(id);
    };


    return (
        <Container>
            <div className='grid grid-cols-3 gap-10 my-20'>

                <div className='col-span-1 '>
                    {product ? (
                        <img src={product?.image} alt={product?.name} className='rounded-2xl' />

                    ) : (
                        <Skeleton className="h-[625px]  w-full rounded-2xl" />

                    )}
                </div>
                <div className='col-span-2'>
                    {product ? (
                        <>
                            <p className='font-medium tracking-widest text-4xl text-gray-800 mt-3 dark:text-white'>{product?.name}</p>
                            <p className='font-sans tracking-wide text-xl text-gray-600 mt-3 dark:text-myTextDark'>{product?.description}</p>
                            <p className='font-bold tracking-wide text-3xl text-green-600 mt-3 mb-3 flex items-center'>
                                <BsCoin className='mt-1 mr-2' />
                                {product?.price.toLocaleString('en-US')}
                            </p>
                            {cat ? (
                                <Link href="" className='underline tracking-wide text-xl text-black dark:text-myTextDark'>
                                {cat?.name}
                            </Link>
                            ) : (
                            <Skeleton className="h-5  w-1/6 rounded-2xl mb-3" />

                            )}
                            <p className='font-sans tracking-wide text-xl text-gray-600 mt-3 dark:text-myTextDark'>
                                Quantity : <span className='font-bold'>{product?.quantity}</span>
                            </p>

                            <div className="inline-flex items-center justify-between border border-gray-200 rounded-lg mt-4 py-2">
                                <button onClick={handleDecrease} className="px-5 text-xl" > - </button>
                                <div className=''>
                                    {value}
                                </div>
                                <button onClick={handleIncrease} className="px-5 text-xl" > + </button>
                            </div>

                            <div className='flex items-center mt-5'>
                                <button
                                 onClick={() => handleFavorite(Number(id))}
                                    type="button"
                                    className="flex text-white bg-gradient-to-r from-red-400 via-red-500
                         to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg
                          shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-4 py-4 text-center me-2 mb-2"
                                >
                                   {isFavorite ? (<FaCheck className='text-2xl' />):(<FaRegHeart className='text-2xl' /> )}
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center text-md text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
                        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg
                         dark:shadow-purple-800/80 font-medium rounded px-7 py-4 text-center me-2 mb-2"
                                >
                                    <ci.CiShoppingCart className='text-2xl mr-2' />
                                    Add to Cart
                                </button>
                            </div>
                        </>
                    ) : (

                        <>
                            <Skeleton className="h-5  w-1/2 rounded-2xl mb-3" />
                            <Skeleton className="h-5  w-1/3 rounded-2xl mb-3" />
                            <Skeleton className="h-5  w-1/2 rounded-2xl mb-3" />
                            <Skeleton className="h-5  w-1/6 rounded-2xl mb-3" />
                            <Skeleton className="h-5  w-1/2 rounded-2xl mb-3" />
                            <Skeleton className="h-12 w-1/6 rounded-2xl mb-3" />
                            <div className='flex items-center'>
                                <Skeleton className="h-12 w-1/6 rounded-2xl mb-3" />
                                <Skeleton className="h-12 w-1/3 rounded-2xl mb-3 ml-3" />

                            </div>
                        </>
                    )}
                </div>
            </div>
        </Container>
    );
}

export default Page;
