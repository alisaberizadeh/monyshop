'use client'

import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import ErrorAlert from '@/components/alerts/ErrorAlert';
import dynamic from 'next/dynamic';
import { AuthContext, AuthProvider } from '@/context/AuthContext';

const DevTool = dynamic(() => import('@hookform/devtools').then((mod) => mod.DevTool), { ssr: false });

function Page() {
    const { register, control, handleSubmit, setError, watch, formState: { errors }, } = useForm();
    const password = watch("password");

    const { user, login } = useContext(AuthContext)

    const onSubmit = async (data: any) => {

        const result = await login(data.email, data.password)
        if (!result.success && result.error) {
            Object.entries(result.error).forEach(([field, messages]) => {
                setError(field === 'general' ? 'root' : field, {
                    type: "server",
                    message: Array.isArray(messages) ? messages[0] : messages,
                });
            });
        }


    };

    return (
        <section className="  dark:bg-bgDark">
            <div className="flex flex-col items-center   px-6 py-8 mx-auto md:h-screen lg:py-0 md:mt-10">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-bgDark2 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign In
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-bgDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-bgDark dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </div>





                            <button
                                type="submit"
                                className="w-full bg-violet-600 text-white focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Go
                            </button>

                            {/* Link to login */}
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don't have an account ? {' '}
                                <Link href="/auth/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                    Sign Up
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
