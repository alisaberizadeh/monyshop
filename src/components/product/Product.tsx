import { FavoritesContext } from "@/context/FavoritesContext";
import { IPropsProduct } from "@/lib/types";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

function Product({ id, name, category, price, image }: IPropsProduct) {
    const [categoryName, setCategoryName] = useState<string | null>(null);
    const { favorites, handleFavorites } = useContext(FavoritesContext);
    const isFavorite = favorites.includes(id);

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
        handleFavorites(id);
    };

    return (
        <div className="col-span-1 bg-white dark:bg-bgDark2 p-4 rounded-sm shadow-sm">
            <Link href="" className="w-full relative group">
                <img
                    src={image}
                    alt={name}
                    className="w-full transition-all duration-300 hover:brightness-75"
                />
            </Link>

            <p className="font-black text-sm mt-4 flex items-center justify-between">
                <Link href="" className="dark:text-white">{name} </Link>
                <span className="text-md cursor-pointer" onClick={() => handleFavorite(id)}>
                    {isFavorite ? (
                        <FaHeart className="text-red-600 text-xl"  />
                    ) : (
                        <FaRegHeart className="text-gray-500  text-xl" />
                    )}
                </span>
            </p>

            <Link href="" className="font-thin text-gray-700 dark:text-myTextDark text-sm mt-1">
                {categoryName || <div role="status">
                    <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-violet-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>}
            </Link>
            <p className="text-sm mt-2 flex items-center">
                <span className="font-black text-red-700 dark:text-orange-500"> ${price}</span>
            </p>
        </div>
    );
}

export default Product;
