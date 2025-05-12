"use client"
import { ThemeProvider } from '@/context/ThemeContext'
import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastContainer, toast } from 'react-toastify';
import { usePathname } from 'next/navigation'
import { AuthProvider } from '@/context/AuthContext'
import axios from 'axios'


function MainLayout(props: { children: React.ReactNode }) {
  useEffect(() => {
    axios.get("http://alisab.ir/sanctum/csrf-cookie", {
      withCredentials: true,
    });
  }, []);
  return (
    <ThemeProvider>

      <AuthProvider>
        <FavoritesProvider>
          <ToastContainer position="bottom-left" autoClose={2000} />

          <Navbar />

          {props.children}
          <Footer />
        </FavoritesProvider>
      </AuthProvider>

    </ThemeProvider>
  )
}

export default MainLayout