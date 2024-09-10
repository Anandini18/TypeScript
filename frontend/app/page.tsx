"use client"; // Add this line

import { useRef, useState } from 'react';
import convertor from '@/lib/converter';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        router.push('/intro'); // Redirect to the register page on load
    }, [router]);

    return null;
}
