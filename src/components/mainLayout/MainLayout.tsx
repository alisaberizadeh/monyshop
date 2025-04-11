"use client"
import { ThemeProvider } from '@/context/ThemeContext'
import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { FavoritesProvider } from '@/context/FavoritesContext'

function MainLayout(props: { children: React.ReactNode }) {
    return (
        <ThemeProvider>

            <FavoritesProvider>
                <Navbar />
                {props.children}
                <Footer />
            </FavoritesProvider>

        </ThemeProvider>
    )
}

export default MainLayout