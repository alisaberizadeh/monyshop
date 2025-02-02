"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import * as ci from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import Container from "../container/Container";
import { ThemeContext } from "@/context/ThemeContext";

function Navbar() {
    const [openCategories, setOpenCategories] = useState<boolean>(false);
    const { theme, toggleTheme } = useContext(ThemeContext)
    const [bgMenu, setBgMenu ]= useState<boolean>(false)
    const [mneu, setMneu] = useState<boolean>(false)
    
    const openMenu = () => {
        setBgMenu(true)
        setTimeout(() => {
            setMneu(true)
        },100);
    }

    const closeMenu = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!(event.target as HTMLElement).closest(".myMenu")) {
            setMneu(false);
            setTimeout(() => {
                setBgMenu(false);
            }, 100);
        }
    };
    
    return (
        <>
            <div className="w-full  bg-white dark:bg-bgDark">
                <Container className="  grid grid-cols-4 items-center py-4 lg:py-8">
                    <div className="col-span-4 lg:col-span-1  ">
                        <Link
                            href=""
                            className="font-bold tracking-wider flex justify-center lg:justify-normal items-center text-bgDark dark:text-white text-3xl"
                        >
                            <ci.CiShop className="mr-1" /> Mony Shop
                        </Link>
                    </div>
                    <div className="col-span-4 lg:col-span-2 my-7 lg:my-0">
                        <div className="flex h-12 lg:h-14 justify-between border  border-myBorder dark:border-myBorderDark items-center rounded-full">
                            <input
                                type="text"
                                className="w-full text-gray-400 tracking-wider placeholder:text-gray-400 placeholder:font-thin h-full px-5  lg:px-8 bg-transparent outline-none text-sm lg:text-lg"
                                placeholder="Search for the desired product..."
                            />
                            <button className="px-5 lg:px-8 text-myText dark:text-myTextDark dark:hover:text-white hover:text-black h-full text-2xl">
                                <ci.CiSearch />
                            </button>
                        </div>
                    </div>
                    <div className="col-span-4 lg:col-span-1 flex  justify-center lg:justify-normal" dir="rtl">
                        <Link
                            href=""
                            className="text-2xl text-myText dark:text-myTextDark bg-bgLight p-3 hover:bg-hoverBgLight dark:bg-bgDark2 dark:hover:bg-hoverBgDark2 rounded-full mx-2 transition-all ease-in-out "
                        >
                            <ci.CiUser />
                        </Link>
                        <Link
                            href=""
                            className="text-2xl text-myText dark:text-myTextDark bg-bgLight p-3 hover:bg-hoverBgLight dark:bg-bgDark2 dark:hover:bg-hoverBgDark2 rounded-full mx-2 transition-all ease-in-out "
                        >
                            <ci.CiShoppingCart />
                        </Link>
                        <Link
                            href=""
                            className="text-2xl text-myText dark:text-myTextDark bg-bgLight p-3 hover:bg-hoverBgLight dark:bg-bgDark2 dark:hover:bg-hoverBgDark2 rounded-full mx-2 transition-all ease-in-out "
                        >
                            <ci.CiHeart />
                        </Link>
                        <button
                            onClick={toggleTheme}
                            className="text-2xl text-myText dark:text-myTextDark bg-bgLight p-3 hover:bg-hoverBgLight dark:bg-bgDark2 dark:hover:bg-hoverBgDark2 rounded-full mx-2 transition-all ease-in-out "
                        >
                            {theme === "light" ? <ci.CiDark /> : <ci.CiLight />}
                        </button>
                        <button onClick={openMenu}
                            className="text-2xl lg:hidden text-myText dark:text-myTextDark bg-bgLight p-3 hover:bg-hoverBgLight dark:bg-bgDark2 dark:hover:bg-hoverBgDark2 rounded-full mx-2 transition-all ease-in-out"
                        >
                            <ci.CiMenuBurger />
                        </button>
                    </div>
                </Container>
            </div>

            <div onClick={closeMenu} className={`${bgMenu ? "" : "hidden"} z-50  lg:block w-full lg:h-auto h-full bg-bgTransparent fixed lg:relative top-0 right-0 dark:bg-bgTransparentDark border-t border-myBorder dark:border-myBorderDark `}>
                <div className={`myMenu block lg:flex items-center justify-center  transition-all ease-linear bg-white dark:bg-bgDark lg:w-auto w-2/3 lg:h-auto h-full lg:py-0 py-10 absolute lg:relative ${mneu ? "left-0" : "-left-full"} lg:left-0 `}>
                    <Link
                        href=""
                        className="font-bold tracking-wider flex lg:hidden pl-5 lg:justify-normal items-center text-bgDark dark:text-white text-3xl mb-10"
                    >
                        <ci.CiShop className="mr-1" /> Mony Shop
                    </Link>
                    <Link
                        href=""
                        className="  text-myText dark:text-myTextDark hover:text-black px-6 py-3 lg:p-4  transition-all ease-in-out dark:hover:text-white tracking-widest lg:mx-5 block"
                    >
                        Home
                    </Link>
                    <Link
                        href=""
                        className="text-myText dark:text-myTextDark hover:text-black  px-6 py-3 lg:p-4  transition-all ease-in-out dark:hover:text-white tracking-widest lg:mx-5 block"
                    >
                        Shop
                    </Link>
                    <button
                        onClick={() => setOpenCategories(!openCategories)}
                        className="text-myText dark:text-myTextDark hover:text-black  px-6 py-3 lg:p-4  transition-all ease-in-out dark:hover:text-white tracking-widest lg:mx-5  relative "
                    >
                        <div className="flex items-center">Categories {openCategories ? <FaAngleUp className="ml-1" /> : <FaAngleDown className="ml-1" />}</div>
                        {openCategories && (
                            <div className="lg:absolute top-full left-0 bg-white lg:mt-0 mt-4 dark:bg-bgDark dark:border dark:border-myBorderDark w-full lg:shadow-xl">
                                <Link href="" className="block py-2 border-b border-myBorder dark:border-myBorderDark pl-5 text-left w-full text-myText dark:text-myTextDark hover:text-black dark:hover:text-white" >test</Link>
                                <Link href="" className="block py-2 border-b border-myBorder dark:border-myBorderDark pl-5 text-left w-full text-myText dark:text-myTextDark hover:text-black dark:hover:text-white" >test</Link>
                                <Link href="" className="block py-2 border-b border-myBorder dark:border-myBorderDark pl-5 text-left w-full text-myText dark:text-myTextDark hover:text-black dark:hover:text-white" >test</Link>
                                <Link href="" className="block py-2 border-b border-myBorder dark:border-myBorderDark pl-5 text-left w-full text-myText dark:text-myTextDark hover:text-black dark:hover:text-white" >test</Link>
                            </div>
                        )}
                    </button>

                    <Link
                        href=""
                        className="text-myText dark:text-myTextDark hover:text-black  px-6 py-3 lg:p-4  transition-all ease-in-out dark:hover:text-white tracking-widest lg:mx-5 block"
                    >
                        Blog
                    </Link>
                    <Link
                        href=""
                        className="text-myText dark:text-myTextDark hover:text-black  px-6 py-3 lg:p-4  transition-all ease-in-out dark:hover:text-white tracking-widest lg:mx-5 block"
                    >
                        About
                    </Link>
                    <Link
                        href=""
                        className="text-myText dark:text-myTextDark hover:text-black  px-6 py-3 lg:p-4  transition-all ease-in-out dark:hover:text-white tracking-widest lg:mx-5 block"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Navbar;
