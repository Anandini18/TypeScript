"use client"; // Add this line

import { useRef, useState } from 'react';
import convertor from '@/lib/converter';
import TextCard from '@/components/Cards/TextCard'; // Import TextCard component
import axios from 'axios';
import { toast } from 'react-toastify';

export default function ExtractPage() {
    const [processing, setProcessing] = useState<boolean>(false);
    const [texts, setTexts] = useState<string[]>([]);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const userId = 1; // Replace with dynamic user ID

    const openBrowseImage = () => {
        imageInputRef.current?.click();
    };

    const convert = async (url: string) => {
        setProcessing(true);
        try {
            const txt = await convertor(url, userId);
            setTexts(prevTexts => [...prevTexts, txt]);
        } finally {
            setProcessing(false);
        }
    };

    const handleSave = async (text: string) => {
        try {
            const token = localStorage.getItem('authToken'); // Assuming your token is stored in localStorage
            const response = await axios.post('http://localhost:8080/api/save', 
                { text }, 
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Pass the token in the Authorization header
                    }
                }
            );
    
            if (response.status === 200) {
                toast.success("Text saved successfully!");
            } else {
                toast.error("Failed to save text.");
            }
        } catch (error) {
            toast.error("There was an error saving the text.");
            console.error('Save error:', error);
        }
    };
    

    const handleCopy = (text: string) => {
        console.log("Text copied:", text);
    };

    return (
        <div className="min-h-[90vh] p-5">
            <h1 className="text-2xl mb-5">Extract Text from Image</h1>
            <input
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const url = URL.createObjectURL(e.target.files?.[0]!);
                    convert(url);
                }}
                ref={imageInputRef}
                type="file"
                hidden
            />
            <div className="p-5 border border-gray-300 rounded-lg">
                <button
                    onClick={openBrowseImage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                    Upload an Image
                </button>
            </div>
            {processing && <p>Processing...</p>}
            {texts.map((text, index) => (
                <div key={index} className="mb-5">
                    <TextCard
                        text={text}
                        index={index}
                        onCopy={handleCopy}
                    />
                    <button
                        onClick={() => handleSave(text)}
                        className="bg-green-500 text-white px-4 py-2 rounded-md mt-2"
                    >
                        Save
                    </button>
                </div>
            ))}
        </div>
    );
}
