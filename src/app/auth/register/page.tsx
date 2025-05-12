'use client'

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CiShop } from 'react-icons/ci';
import Link from 'next/link';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import dynamic from 'next/dynamic';
import { AuthContext, AuthProvider } from '@/context/AuthContext';

const DevTool = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), { ssr: false });

function Page() {
    const { register, control, handleSubmit, setError, watch, formState: { errors }, } = useForm();
    const password = watch("password");

    const { user, signUp } = useContext(AuthContext)

    const onSubmit = async (data: any) => {

        const result = await signUp(data)
        if (!result.success && result.error) {
            Object.entries(result.error).map(([field, messages]) => {
                setError(field, {
                    type: "server",
                    message: Array.isArray(messages) ? messages[0] : messages,
                });
            });
        }

    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center   px-6 py-8 mx-auto md:h-screen lg:py-0 md:mt-10">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign Up
                        </h1>

                        {Object.values(errors).length > 0 && (
                            <ErrorAlert>
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{String(error?.message)}</li>
                                ))}
                            </ErrorAlert>
                        )}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    {...register('name', {
                                        required: 'Name is required',
                                        pattern: {
                                            value: /^[\u0600-\u06FFa-zA-Z\s]+$/,
                                            message:
                                                "The name can only contain letters and spaces.",
                                        },
                                    })}
                                    placeholder="Enter your name"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>


                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: 'Invalid email format',
                                        },
                                    })}
                                    placeholder="name@company.com"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>


                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    {...register('password', {
                                        required: 'Password is required',
                                        pattern: {
                                            value: /^.{9,}$/,
                                            message:
                                                "Password must be more than 8 characters",
                                        }
                                    })}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>


                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    {...register('confirmPassword', {
                                        required: 'Confirm password is required',
                                        pattern: {
                                            value: /^.{9,}$/,
                                            message:
                                                "Confirm password must be more than 8 characters",
                                        },
                                        validate: (value) =>
                                            value === password ||
                                            "Password and password repetition are not the same"
                                    })}
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>


                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                            </div>


                            <button
                                type="submit"
                                className="w-full bg-violet-600 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign Up
                            </button>

                            {/* Link to login */}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Have you already registered?{' '}
                                <Link href="/auth/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign In
                                </Link>
                            </p>


                            <DevTool control={control} />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Page;
