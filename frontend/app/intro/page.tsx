// app/intro/page.tsx

"use client";
import { useRouter } from 'next/navigation';

export default function Intro() {
    const router = useRouter();

    const handleRegisterClick = () => {
        router.push('/register'); // Navigate to register page
    };

    const handleLoginClick = () => {
        router.push('/login'); // Navigate to login page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl md:text-6xl text-center font-bold mb-10">Welcome to Get Text</h1>
            <button
                onClick={handleRegisterClick}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all mb-4"
            >
                Register
            </button>
            <button
                onClick={handleLoginClick}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-all"
            >
                Login
            </button>
        </div>
    );
}
