"use client"
import Container from '@/components/container/Container'
import { Skeleton } from '@/components/ui/skeleton'
import { CartContext } from '@/context/CartContext'
import { IProduct } from '@/lib/types'
import axios from 'axios'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { FaAnglesRight, FaTrash } from 'react-icons/fa6'
import Cookies from "js-cookie";
import { toast } from 'react-toastify'

function Page() {
    const { cart, addCart } = useContext(CartContext)
    const [products, setProducts] = useState<IProduct[]>([]);
    const [finalPrice, setFinalPrice] = useState(0)

    useEffect(() => {
        const fetchCart = async () => {
            if (!cart) return;

            try {
                const responses = await Promise.all(
                    cart.map(item => axios.get(`http://alisab.ir/products/show/${item.product_id}`))
                );
                const productsData = responses.map(res => res.data);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchCart();
    }, [cart]);

    useEffect(() => {
        let total = 0;
        products.forEach(product => {
            const cartItem = cart.find(ci => ci.product_id === product.id);
            const quantity = cartItem?.quantity || 1;
            total += product.price * quantity;
        });
        setFinalPrice(total);
    }, [products, cart]);

    const addToCart = (id: number, baseQuantity: number) => {
        addCart(id, baseQuantity);
    };

    const submitCart = async () => {
        const token = Cookies.get('token');

        try {
            const res = await axios.get("http://alisab.ir/cart/submit", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                toast.success('Your order was successfully placed .', { autoClose: 5000 });

            }



        } catch (error) {
            console.error("my error : ", error);

        }
    }

    return (
        <Container>
            <div className="min-h-screen py-8">
                <p className='dark:text-myTextDark text-center my-8 rounded-full font-sans text-2xl tracking-widest flex items-center justify-start'>
                    <FaAnglesRight className='text-base' /><span className='mx-2'>Cart</span>
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        {products.length > 1 ? (
                            products.map((item: IProduct) => {
                                const cartItem = cart.find(ci => ci.product_id === item.id);
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 bg-white dark:bg-bgDark2 p-4 rounded shadow-sm"
                                    >
                                        <Link href={`/shop/${item.id}`}>
                                            <img
                                                src={item.image}
                                                alt="Product"
                                                className="w-24 h-24 object-cover rounded"
                                            />
                                        </Link>
                                        <div className="flex-1">
                                            <Link href={`/shop/${item.id}`} className="font-semibold text-sm dark:text-white">{item.name}</Link>
                                            <p className="text-orange-600 font-bold mt-2">${item.price}</p>
                                            <div className="mt-2 flex items-center gap-2">
                                                <label className="text-sm text-gray-500">Quantity : {cartItem?.quantity || 1}</label>
                                            </div>
                                        </div>
                                        <button onClick={() => addToCart(item.id, Number(cartItem?.quantity))} className="text-white bg-red-600 rounded-sm p-2">
                                            <FaTrash />
                                        </button>
                                    </div>
                                );
                            })
                        ) : (
                            Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} className="col-span-1 flex flex-col space-y-3">
                                    <Skeleton className="h-[125px] w-full rounded-xl" />
                                </div>
                            ))
                        )}
                    </div>

                    {products.length > 1 ? (
                        <div className="bg-white dark:bg-bgDark2 p-6 rounded shadow-sm h-fit">
                            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                            <div className="flex justify-between mb-2">
                                <span className="text-sm">Subtotal</span>
                                <span className="text-sm font-semibold">${finalPrice}</span>
                            </div>

                            <div className="flex justify-between mb-2">
                                <span className="text-sm">Shipping</span>
                                <span className="text-sm font-semibold">Free</span>
                            </div>

                            <hr className="my-4" />

                            <div className="flex justify-between mb-6">
                                <span className="text-base font-medium">Total</span>
                                <span className="text-base font-bold text-orange-600">${finalPrice}</span>
                            </div>

                            <button onClick={submitCart} className="w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
                                Continue to Checkout
                            </button>
                        </div>
                    ) : (
                        <div className="col-span-1 flex flex-col space-y-3">
                            <Skeleton className="h-[250px] w-full rounded-xl" />
                        </div>
                    )}

                </div>
            </div>
        </Container>
    )
}

export default Page;
