"use client";
import React, { useEffect, useState } from 'react';
import * as fa from "react-icons/fa6";
import Link from 'next/link';
import { ICat, IProduct } from '@/lib/types';
import Product from '@/components/product/Product';
import { Skeleton } from '@/components/ui/skeleton';
import Container from '@/components/container/Container';
import Filter from '@/components/filter/Filter';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { CiCircleCheck } from 'react-icons/ci';

function Shop() {
  const [loader, setLoader] = useState<boolean>(true);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cats, setCats] = useState<ICat[]>([]);
  const searchParams = useSearchParams();
  const category_id = searchParams.get('category');
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(0)
  const [selectedMin, setSelectedMin] = useState<number>(minPrice);
  const [selectedMax, setSelectedMax] = useState<number>(maxPrice);
  const [productsFilter, setProductsFilter] = useState<IProduct[]>([]);

  const apply = async () => {
    const filteredProducts = products.filter((item: IProduct) => 
      item.price >= selectedMin && item.price <= selectedMax
    );
    setProducts(filteredProducts); 
  }

  const getData = async () => {
    try {
      const res = await axios.get("http://alisab.ir/products");
      setProducts(res.data);
      setLoader(false);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  const getCats = async () => {
    try {
      const cat_res = await axios.get('http://alisab.ir/categories');
      setCats(cat_res.data);
    } catch (err) {
      console.error('Error:', err);
    }
  }
  const getCatProducts = async (id: number) => {
    try {
      const cat_products = await axios.get(`http://alisab.ir/products/category/${id}`);
      setProducts(cat_products.data);
      setLoader(false);
    } catch (error) {
      console.error('Error :', error);
    }
  };

  const handleData = ()=>{
    if (!category_id) {
      getData();
    } else {
      getCatProducts(Number(category_id));
    }
    getCats();
  }

  useEffect(() => {
    handleData()
  }, [category_id]);

  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map(item => item.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setSelectedMin(min);
      setSelectedMax(max);
    }
  }, [products]);



  return (
    <Container>
      <div className='w-full my-10 grid grid-cols-4 gap-10 min-h-screen'>
        <div className='col-span-1'>
          <p className='dark:text-myTextDark text-center my-8 rounded-full font-sans text-2xl tracking-widest flex items-center justify-start'>
            <fa.FaAnglesRight className='text-base' />
            <span className='mx-2'> Shop</span>
          </p>

          <Filter title='Categories' active={!!category_id}>
            <Link
              href="/shop"
              className={`w-full flex items-center py-3 border-b cursor-pointer text-gray-500 border-gray-100 hover:text-violet-600 ${!category_id ? "text-violet-600 font-bold" : ""}`}
            >
              All Products
              {!category_id ? <CiCircleCheck className='ml-1 text-lg' /> : ""}
            </Link>
            {cats.map((item: ICat, i: number) => (
              <Link
                href={{ pathname: '/shop', query: { category: item.id } }}
                key={i}
                className={`w-full flex items-center py-3 border-b cursor-pointer text-gray-500 border-gray-100 hover:text-violet-600 ${category_id && Number(category_id) === item.id ? 'text-violet-600 font-bold' : ''}`}
              >
                {item.name}
                {category_id && Number(category_id) === item.id ? (
                  <CiCircleCheck className='ml-1 text-lg' />
                ) : (
                  ""
                )}
              </Link>
            ))}
          </Filter>

          <Filter title='Price Range'>
            <div className="relative mb-6 py-5">
              <label className="sr-only">Price range</label>

              {/* min range */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={selectedMin}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val <= selectedMax) setSelectedMin(val);
                }}
                className="w-full mb-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />

              {/* max range */}
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={selectedMax}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  if (val >= selectedMin) setSelectedMax(val);
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />

              {/* نمایش قیمت‌ها */}
              <div className='w-full flex justify-between mt-4'>
                <span className="text-sm text-violet-600 font-bold">Min (${selectedMin})</span>
                <button onClick={apply} type="button" className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Apply</button>
                <button onClick={handleData} type="button" className="flex text-white bg-gradient-to-r from-red-400 via-red-500
         to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg
          shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded text-sm px-4 py-4 text-center">Clear</button>
                <span className="text-sm text-violet-600 font-bold">Max (${selectedMax})</span>
              </div>
            </div>

          </Filter>
        </div>

        <div className='col-span-3'>
          <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-10'>
            {products.map((item: IProduct, index: number) => (
              <Product
                key={index}
                name={item.name}
                image={item.image}
                price={item.price}
                category={item.category_id}
                id={item.id}
                quantity={item.quantity}
              />
            ))}
            {loader &&
              Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="col-span-1 flex flex-col space-y-3">
                  <Skeleton className="h-[225px] w-full rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[250px]" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Shop;
