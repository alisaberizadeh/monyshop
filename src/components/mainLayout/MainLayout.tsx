"use client"
import {  ThemeProvider } from '@/context/ThemeContext'
import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'

function MainLayout(props: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Navbar />
            {props.children}
      <Footer />

        </ThemeProvider>
    )
}

export default MainLayout