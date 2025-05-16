"use client";
import { FavoritesContext } from "@/context/FavoritesContext";
import { IPropsProduct } from "@/lib/types";
import Link from "next/link";
import React, { useContext } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import Cookies from "js-cookie";
import { CartContext } from "@/context/CartContext";
import { AuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { BsCartPlus, BsCartXFill } from "react-icons/bs";

function Product({ id, name, category, price, image, quantity }: IPropsProduct) {
    const { favorites, handleFavorites } = useContext(FavoritesContext);
    const isFavorite = favorites.includes(id);
    const { addCart, cart } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    const isCart = cart.some(item => item.product_id === id);
    const router = useRouter();


    const handleFavorite = (id: number) => {
        handleFavorites(id);
    };


    const addToCart = async (id: number, baseQuantity: number) => {
        if (user) {
            if (Number(quantity) > 0) {
                addCart(id, baseQuantity)
            }
            else {
                Swal.fire({
                    title: "There is not enough inventory !",
                    icon: "error",
                    draggable: true
                });
            }
        }
        else {
            Swal.fire({
                title: "First, log in to your account!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: 'Go to Login',
                cancelButtonText: 'Cancel',
                cancelButtonColor: "#cdcdcd",
                confirmButtonColor: "#005aff",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/auth/login");
                }
            });

        }
    };


    return (
        <div className="col-span-1 bg-white dark:bg-bgDark2 p-4 rounded-sm shadow-sm">
            <Link href={`/shop/${id}`} className="w-full relative group">
                <img
                    src={image}
                    alt={name}
                    className="w-full transition-all duration-300 hover:brightness-75"
                />
            </Link>

            <p className="font-black text-sm mt-4 flex items-center justify-between">
                <Link href={`/shop/${id}`} className="dark:text-white">{name} </Link>
                <span className="flex items-center">

                    <span className="text-md cursor-pointer mr-5" onClick={() => addToCart(id, 1)}>

                    {isCart&&user ? (
                        <BsCartXFill className="text-green-500 text-2xl"  />
                    ) : (
                        <BsCartPlus className="text-gray-500  text-2xl" />
                    )}
                    </span>
                    <span className="text-md cursor-pointer" onClick={() => handleFavorite(id)}>
                        {isFavorite ? (
                            <FaHeart className="text-red-600 text-xl" />
                        ) : (
                            <FaRegHeart className="text-gray-500  text-xl" />
                        )}
                    </span>
                </span>
            </p>

            <p className="font-thin text-gray-700 dark:text-myTextDark text-sm mt-1">
                Quantity :  <span className="font-black">{quantity}</span>
            </p>
            <p className="text-sm mt-2 flex items-center">
                <span className="font-black text-orange-600 dark:text-orange-500"> ${price}</span>
            </p>
        </div>
    );
}

export default Product;
