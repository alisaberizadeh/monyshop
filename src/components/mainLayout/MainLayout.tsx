"use client"
import {  ThemeProvider } from '@/context/ThemeContext'
import React from 'react'
import Navbar from '../navbar/Navbar'

function MainLayout(props: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <Navbar />
            {props.children}
        </ThemeProvider>
    )
}

export default MainLayout