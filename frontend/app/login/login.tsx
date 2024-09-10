"use client"; // Add this line

import { useRef, useState } from 'react';
import convertor from '@/lib/converter';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post('http://localhost:8080/api/login', data);

            if (response.status === 200) {
                toast.success('Login successful!');
                setTimeout(() => {
                    router.push('/texts');
                }, 2000);
            }
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 401) {
                toast.error('Invalid username or password');
            } else {
                toast.error('Network error. Please try again later.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username')} placeholder="Username" required />
                <input {...register('password')} type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <ToastContainer />
        </div>
    );
}
