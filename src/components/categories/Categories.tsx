"use client";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Skeleton } from '../ui/skeleton';
import { ICat } from '@/lib/types';



function Categories() {
    const [loader, setLoader] = useState<boolean>(true);
    const [cats, setCats] = useState<ICat[]>([]);

    useEffect(() => {

        const getCategories = async () => {
            try {
                const res = await fetch('http://127.0.0.1:8000/categories');
                const data = await res.json();
                setCats(data)
                setLoader(false)
            } catch (err) {
                console.error('Error:', err);
            }
        };

        getCategories()
    }, []);


    return (
        <div className='w-full  grid grid-cols-6 gap-7 mt-7 mb-10'>
            {cats.map((item: ICat, index: number) => {
                return (
                    <Link
                        href=""
                        key={index}
                        className="col-span-3 md:col-span-2 lg:col-span-1 bg-white dark:bg-bgDark2 flex justify-center items-center p-5 rounded-xl shadow-sm"
                    >
                        <p className="font-extralight lg:text-xl text-lg tracking-widest dark:text-gray-300">
                            {item.name}
                        </p>
                    </Link>
                );
            })}

            {loader &&
                Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="col-span-1 flex flex-col space-y-3">
                        <Skeleton className="h-[68px] w-full rounded-2xl" />
                    </div>
                ))}

        </div>



    )
}

export default Categories








