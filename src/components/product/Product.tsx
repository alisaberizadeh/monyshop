"use client";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";


function Product() {
    const [favorite, setFavorite] = useState<boolean>(false);



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
                <span className=" text-md cursor-pointer " onClick={() => setFavorite(!favorite)}>
                    {!favorite && (
                        <FaRegHeart className="text-gray-500" />
                    )}
                    {favorite && (
                        <FaHeart className="text-red-600" />
                    )}
                </span>
            </p>

            <Link href="" className="font-thin text-gray-700 text-sm mt-1">
                Hat
            </Link>
            <p className="text-sm mt-2 flex items-center">
                <span className="font-black text-red-700"> $5000</span>
                <span className="font-thin text-gray-500 ml-3 line-through">
                    $100
                </span>
            </p>
        </div>
    );
}

export default Product;
