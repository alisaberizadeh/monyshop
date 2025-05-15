"use client"

import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";

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
                const res = await axios.get("http://alisab.ir/cart", {
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
        getData()
    }, [cart]);

    const addCart = async (id: number, quantity: number) => {
        const token = Cookies.get("token");
        const response = await fetch(`http://alisab.ir/products/${id}/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ quantity: quantity })
        });

        const data = await response.json();
        getData()
        toast.success('Product added to cart !');
    }

    return (
        <CartContext.Provider value={{ cart, addCart }}>
            {children}
        </CartContext.Provider>
    );
};

