"use client"
import { ThemeProvider } from '@/context/ThemeContext'
import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { ToastContainer, toast } from 'react-toastify';


function MainLayout(props: { children: React.ReactNode }) {
    return (
        <ThemeProvider>

            <FavoritesProvider>
            <ToastContainer position="bottom-left" autoClose={2000} />

                <Navbar />

                {props.children}
                <Footer />
            </FavoritesProvider>

        </ThemeProvider>
    )
}

export default MainLayout