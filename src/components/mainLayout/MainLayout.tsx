"use client"
import { ThemeProvider } from '@/context/ThemeContext'
import React, { useContext, useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastContainer, toast } from 'react-toastify';
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/context/AuthContext'
import axios from 'axios'
import { CartProvider } from '@/context/CartContext'


function MainLayout(props: { children: React.ReactNode }) {

  
  useEffect(() => {
    axios.get("http://realalisaberi.ir/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  }, []);
  useEffect(() => {
    const getCsrf = async () => {
      try {
        await fetch("http://realalisaberi.ir/sanctum/csrf-cookie", {
          method: "GET",
          credentials: "include", // خیلی مهم برای کوکی سشن
        });
      } catch (error) {
        console.error("CSRF init error:", error);
      }
    };

    getCsrf();
  }, []);
  return (
    <ThemeProvider>

      <AuthProvider>
        <CartProvider>

          <FavoritesProvider>
            <ToastContainer position="bottom-left" autoClose={2000} />

            <Navbar />

            {props.children}
            <Footer />
          </FavoritesProvider>
        </CartProvider>

      </AuthProvider>

    </ThemeProvider>
  )
}

export default MainLayout