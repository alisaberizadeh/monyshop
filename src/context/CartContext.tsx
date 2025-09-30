"use client"

import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import Swal from "sweetalert2";

interface ICart {
    id: number
    user_id: number
    product_id: number
    quantity: number
    created_at: string
    updated_at: string
}

interface CartContextType {
    cart: ICart[],
    addCart: (id: number, quantity: number) => void
}

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<ICart[]>([]);
    const { user } = useContext(AuthContext)
    const getData = async () => {
        const token = Cookies.get('token');
        if (token) {
            try {
                const res = await axios.get("https://realalisaberi.ir/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCart(res.data);


            } catch (error) {
                console.error(error);

            }
        }
    }
    useEffect(() => {
        if (user) {
            getData()
        }
    }, [user]);

    const addCart = async (id: number, quantity: number) => {
        const token = Cookies.get("token");
        const isCart = cart.some(item => item.product_id === id)
        try {
            if (isCart) {
                const result = await Swal.fire({
                    title: "Are you sure ?",
                    text: "Remove the product from the shopping cart ?",
                    icon: "info",
                    showCancelButton: true,
                    cancelButtonColor: "#cdcdcd",
                    confirmButtonColor: "#e73333",
                    confirmButtonText: "Delete it.",
                    cancelButtonText: "Cancel"
                });

                if (result.isConfirmed) {
                    const response = await fetch(`https://realalisaberi.ir/products/${id}/return`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    if (response.status === 200) {
                        getData();
                        toast.success('Product removed from cart !',{autoClose: 5000});
                    }
                }


            }
            else {
                const response = await fetch(`https://realalisaberi.ir/products/${id}/buy`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ quantity: quantity })
                });
                const data = await response.json();
                if (response.status === 200) {
                    getData()
                    toast.success('Product added to cart .',{autoClose: 5000});
                }
            }
        } catch (error) {
            console.error(error);

        }
    }


    return (
        <CartContext.Provider value={{ cart, addCart }}>
            {children}
        </CartContext.Provider>
    );
};

