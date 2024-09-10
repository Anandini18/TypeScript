// "use client";
"use client"; // Add this line

import { useRef, useState } from 'react';
import convertor from '@/lib/converter';

import { useForm } from 'react-hook-form'; // Import useForm hook from react-hook-form
import axios from 'axios'; // Import axios for HTTP requests
import { useRouter } from 'next/navigation'; // Change to next/navigation
import { toast, ToastContainer } from 'react-toastify'; // Import toast functions and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

export default function Register() {
    const { register, handleSubmit } = useForm(); // Initialize useForm hook
    const router = useRouter(); // Initialize router

    const onSubmit = async (data: any) => {
        try {
            // Send POST request to the backend to register the user
            await axios.post('http://localhost:8080/api/register', data);
            // Display success toast notification
            toast.success('Registration successful!');
            // Navigate to the login page after 2 seconds
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } catch (error) {
            // Display error toast notification if registration fails
            toast.error('Registration error, please try again.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username')} placeholder="Username" required /> {/* Input for username */}
                <input {...register('password')} type="password" placeholder="Password" required /> {/* Input for password */}
                <button type="submit">Register</button> {/* Submit button */}
            </form>
            <ToastContainer /> {/* Container for displaying toast notifications */}
        </div>
    );
}
