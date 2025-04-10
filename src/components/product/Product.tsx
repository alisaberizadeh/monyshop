import { IPropsProduct } from "@/lib/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

function Product({ id, name, category, price, image }: IPropsProduct) {
    const [favorite, setFavorite] = useState<boolean>(false);
    const [categoryName, setCategoryName] = useState<string | null>(null);

    useEffect(() => {
        const getCategoryName = async () => {
            try {
                const res = await fetch(`http://127.0.0.1:8000/categories/${category}`);
                const data = await res.json();
                setCategoryName(data.name);
            } catch (err) {
                console.error('Error :', err);
            }
        };

        getCategoryName();
    }, [category]);

    const handleFavorite = (id: number) => {
        console.log(id);
        
    };

    return (
        <div className="col-span-1 bg-white dark:bg-bgDark2 p-4 rounded-sm shadow-sm">
            <Link href="" className="w-full relative group">
                <img src={image}
                    alt={name}
                    className="w-full transition-all duration-300 hover:brightness-75"
                />
            </Link>

            <p className="font-black text-sm mt-4 flex items-center justify-between">
                <Link href="" className="dark:text-white">{name} </Link>
                <span className="text-md cursor-pointer" onClick={() => handleFavorite(id)}>
                    {!favorite && (
                        <FaRegHeart className="text-gray-500" />
                    )}
                    {favorite && (
                        <FaHeart className="text-red-600" />
                    )}
                </span>
            </p>

            <Link href="" className="font-thin text-gray-700 dark:text-myTextDark text-sm mt-1">
                {categoryName || "Loading..."}
            </Link>
            <p className="text-sm mt-2 flex items-center">
                <span className="font-black text-red-700 dark:text-orange-500"> ${price}</span>
            </p>
        </div>
    );
}

export default Product;
