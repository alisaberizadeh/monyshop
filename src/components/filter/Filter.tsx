"use client";
import Link from "next/link";
import React, { ReactNode, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

interface IFilter {
    children: ReactNode,
    title:string,
    active ?: boolean
}

function Filter(props:IFilter) {
    const [filterOpen, setFilterOpen] = useState<boolean>(props.active || false);

    return (
        <div className="w-full">
            <p onClick={() => setFilterOpen(!filterOpen)} className={`flex items-center justify-between p-4  hover:bg-neutral-200 mt-2 bg-white duration-300 transition-all cursor-pointer ${filterOpen ? "bg-neutral-200" : "initial"}`}>
                {props.title}
                {filterOpen ? <FaAngleUp /> : <FaAngleDown />}
            </p>
            <div
                className={`w-full bg-white  px-3 overflow-hidden transition-all duration-300 ease-in-out ${
                    filterOpen ? "max-h-screen  opacity-100" : "max-h-0 opacity-0"
                }`}
            >
                {props.children}
            </div>
        </div>
    );
}

export default Filter;
