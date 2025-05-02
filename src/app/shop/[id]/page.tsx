'use client'

import Container from '@/components/container/Container';
import { ICategury, IComment, IProduct } from '@/lib/types';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BsCoin } from "react-icons/bs";
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { FavoritesContext } from '@/context/FavoritesContext';
import { FaBuffer, FaCheck, FaCommentMedical, FaComments, FaRegHeart } from "react-icons/fa6";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import { CiChat1, CiShoppingCart } from 'react-icons/ci';
import { BiSolidCheckShield } from "react-icons/bi";
import ShopBenefits from '@/components/shopBenefits/ShopBenefits';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Product from '@/components/product/Product';
import Comment from '@/components/comment/Comment';


function Page() {
    const { id } = useParams();

    const [value, setValue] = useState<number>(1);
    const [product, setProduct] = useState<IProduct>();
    const [similarProducts, setSimilarProducts] = useState<IProduct[]>();
    const [comments, setComments] = useState<IComment[]>();
    const [cat, setCat] = useState<ICategury>();
    const [activeTab, setActiveTab] = useState<"similar" | "comments">("similar");

    const { favorites, handleFavorites } = useContext(FavoritesContext);
    const isFavorite = favorites.includes(Number(id));


    const handleDecrease = () => {
        if (value > 1) setValue(value - 1);
    };

    const handleIncrease = () => {
        if (product) {
            if (value < product.quantity) {
                setValue(value + 1);
            }
        }
    };

    useEffect(() => {
        if (!id) return;

        const getData = async () => {
            try {
                const res = await axios.get(`http://alisab.ir/products/show/${id}`);
                setProduct(res.data);

                const cat_res = await axios.get(`http://alisab.ir/categories/${res.data.category_id}`);
                setCat(cat_res.data);

                const similar = await axios.get(`http://alisab.ir/products/category/${res.data.category_id}`);
                setSimilarProducts(similar.data);

                const comments_res = await axios.get(`http://alisab.ir/products/show/${res.data.id}/comments`);
                setComments(comments_res.data);


            } catch (error) {
                console.error('Error :', error);
            }
        };

        getData();
    }, [id]);

    const handleFavorite = (id: number) => {
        handleFavorites(id);
    };


    return (
        <Container>
            <>
                <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-10 lg:mt-10 my-10'>

                    <div className='col-span-1 '>
                        {product ? (
                            <InnerImageZoom
                                src={product?.image}
                                zoomSrc={product?.image}
                                zoomType="hover"
                                zoomPreload={true}
                                imgAttributes={{ alt: product?.name }}
                                className='rounded-2xl'
                            />

                        ) : (
                            <Skeleton className="h-[625px]  w-full rounded-2xl" />

                        )}
                    </div>
                    <div className='col-span-2'>
                        {product ? (
                            <>
                                <p className='font-medium tracking-widest text-4xl text-gray-800 mt-3 dark:text-white'>{product?.name}</p>
                                <p className='font-sans tracking-wide text-xl text-gray-600 mt-3 dark:text-myTextDark'>{product?.description}</p>
                                <p className='font-bold tracking-wide text-3xl text-orange-600 mt-3 mb-3 flex items-center'>
                                    <BsCoin className='mt-1 mr-2' />
                                    {product?.price.toLocaleString('en-US')}
                                </p>
                                {cat ? (
                                    <Link href="" className='underline tracking-wide text-xl text-black dark:text-myTextDark'>
                                        {cat?.name}
                                    </Link>
                                ) : (
                                    <Skeleton className="h-5  w-1/6 rounded-2xl mb-3" />

                                )}
                                <p className='font-sans tracking-wide text-xl text-gray-600 mt-3 dark:text-myTextDark'>
                                    Quantity : <span className='font-bold'>{product?.quantity}</span>
                                </p>

                                <div className="inline-flex items-center justify-between border border-gray-200 rounded-lg mt-4 py-2 dark:text-myTextDark bg-white dark:bg-bgDark2 dark:border-bgDark2">
                                    <button onClick={handleDecrease} className="px-5 text-xl" > - </button>
                                    <div className=''>
                                        {value}
                                    </div>
                                    <button onClick={handleIncrease} className="px-5 text-xl" > + </button>
                                </div>

                                <p className='flex items-center mt-4 text-green-700'><BiSolidCheckShield className='mr-1' /> Guarantee of authenticity and physical health of the product</p>

                                <div className='flex items-center mt-5'>
                                    <button
                                        onClick={() => handleFavorite(Number(id))}
                                        type="button"
                                        className="flex text-white bg-gradient-to-r from-red-400 via-red-500
         to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg
          shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-4 py-4 text-center me-2 mb-2"
                                    >
                                        {isFavorite ? (<FaCheck className='text-2xl' />) : (<FaRegHeart className='text-2xl' />)}
                                    </button>
                                    <button
                                        type="button"
                                        className="flex items-center text-md text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 
        hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg
         dark:shadow-purple-800/80 font-medium rounded px-7 py-4 text-center me-2 mb-2"
                                    >
                                        <CiShoppingCart className='text-2xl mr-2' />
                                        Add to Cart
                                    </button>
                                </div>
                            </>
                        ) : (

                            <>
                                <Skeleton className="h-5  w-1/2 rounded-2xl mb-3" />
                                <Skeleton className="h-5  w-1/3 rounded-2xl mb-3" />
                                <Skeleton className="h-5  w-1/2 rounded-2xl mb-3" />
                                <Skeleton className="h-5  w-1/6 rounded-2xl mb-3" />
                                <Skeleton className="h-5  w-1/2 rounded-2xl mb-3" />
                                <Skeleton className="h-12 w-1/6 rounded-2xl mb-3" />
                                <div className='flex items-center'>
                                    <Skeleton className="h-12 w-1/6 rounded-2xl mb-3" />
                                    <Skeleton className="h-12 w-1/3 rounded-2xl mb-3 ml-3" />

                                </div>
                            </>
                        )}
                    </div>
                </div>

                <ShopBenefits />

                <div className="w-full bg-white mx-auto mt-10 rounded-xl">

                    <div className="flex border-b border-gray-300">
                        <button
                            onClick={() => setActiveTab("similar")}
                            className={`px-10 py-5 transition-all border-white flex items-center border-b-2 duration-200 ${activeTab === "similar"
                                ? "text-violet-600 border-b-2 border-violet-600"
                                : "text-gray-600 hover:text-violet-500"
                                }`}
                        >
                            <FaBuffer className='mr-2' />
                            Similar Products
                        </button>
                        <button
                            onClick={() => setActiveTab("comments")}
                            className={`px-4 py-5 transition-all border-white border-b-2 flex items-center duration-200 ${activeTab === "comments"
                                ? "text-violet-600 border-b-2 border-violet-600"
                                : "text-gray-600 hover:text-violet-500"
                                }`}
                        >
                            <FaComments className='mr-2' />

                            Comments ({comments?.length})
                        </button>
                    </div>

                    <div className="p-4  rounded-xl">
                        {activeTab === "similar" && (
                            <Swiper
                                modules={[Navigation]}
                                navigation
                                spaceBetween={20}
                                breakpoints={{
                                    1: {
                                        slidesPerView: 1,
                                    },
                                    600: {
                                        slidesPerView: 2,
                                    },
                                    900: {
                                        slidesPerView: 3,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                }}
                            >
                                {
                                    !similarProducts ? (
                                        Array.from({ length: 10 }).map((_, i) => (

                                            <SwiperSlide key={i}>
                                                <Skeleton className="h-[225px] w-full rounded-xl" />
                                                <div className="mt-2">
                                                    <Skeleton className="h-4 w-[250px] mt-2" />
                                                    <Skeleton className="h-4 w-[200px] mt-2" />
                                                    <Skeleton className="h-4 w-[250px] mt-2" />
                                                </div>
                                            </SwiperSlide>
                                        ))
                                    ) : (
                                        similarProducts?.map((item: IProduct, index: number) => (
                                            item.id !== Number(id) && (
                                                <SwiperSlide key={index}>
                                                    <Product
                                                        name={item.name}
                                                        image={item.image}
                                                        price={item.price}
                                                        id={item.id}
                                                        quantity={item.quantity}
                                                        category={item.category_id}
                                                    />
                                                </SwiperSlide>
                                            )
                                        ))
                                    )
                                }


                            </Swiper>
                        )}
                        {activeTab === "comments" && (
                            <div className='lg:w-1/2'>

                                {comments?.map((item, i) => (
                                        <Comment
                                            key={i}
                                            avatarUrl="https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
                                            comment={item.comment}
                                            date={item.created_at.split("T")[0]}
                                            name={item.user.name}
                                        />
                                ))}

                                <div className='w-full'>
                                    <p className='flex  items-center text-gray-800 text-xl'><FaCommentMedical className='mr-2' /> Write your opinion about this product .</p>
                                    <textarea
                                        className="w-full p-4 mt-3 border border-gray-300 rounded-lg resize-none focus:outline-none  "
                                        placeholder="Write your comment..."
                                        rows={4}
                                    />
                                    <button type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-2 mb-2">Send</button>


                                </div>

                            </div>
                        )}
                    </div>

                </div>

            </>
        </Container>
    );
}

export default Page;
