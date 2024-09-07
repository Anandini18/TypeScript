"use client";
import { useForm } from 'react-hook-form'; // Import useForm hook from react-hook-form
import axios from 'axios'; // Import axios for HTTP requests
import { useRouter } from 'next/navigation'; // Change to next/navigation
import { toast, ToastContainer } from 'react-toastify'; // Import toast functions and ToastContainer from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import react-toastify CSS

export default function Login() {
    const { register, handleSubmit } = useForm(); // Initialize useForm hook
    const router = useRouter(); // Initialize router

    const onSubmit = async (data: any) => {
        try {
            // Send POST request to the backend to log in the user
            const response = await axios.post('http://localhost:8080/api/login', data);
            // Store the received token in local storage
            localStorage.setItem('token', response.data.token);
            // Display success toast notification
            toast.success('Login successful!');
            // Navigate to the texts page after 2 seconds
            setTimeout(() => {
                // router.push('/texts');
            }, 2000);
        } catch (error) {
            // Display error toast notification if login fails
            // toast.error('Login error, please check your credentials.');
            // console.log(error+"ddddddddddd");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register('username')} placeholder="Username" required /> {/* Input for username */}
                <input {...register('password')} type="password" placeholder="Password" required /> {/* Input for password */}
                <button type="submit">Login</button> {/* Submit button */}
            </form>
            <ToastContainer /> {/* Container for displaying toast notifications */}
        </div>
    );
} // wapis se start karna backend
