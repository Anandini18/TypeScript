// components/Cards/TextCard.tsx
import React from "react";
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface TextCardProps {
  text: string;
  index: number;
  onCopy: (text: string) => void;
}

const TextCard: React.FC<TextCardProps> = ({ text, index, onCopy }) => {
  const copyToClipboard = (txt: string) => {
    navigator.clipboard.writeText(txt);
    // Optionally show a success message
    // toast.success("Copied To Clipboard.");
  };

  const handleCopyClick = async () => {
    copyToClipboard(text);
    onCopy(text); // Call the onCopy function to save text to the database
    
    try {
      const response = await axios.post('http://localhost:8080/api/save', { text });
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error('There was an error saving the text!', error);
    }
    
    console.log("Copy button dab chuka hai!");
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-5 px-5 gap-10">
        <p className="text-white text-sm md:text-xl">
          {"(" + (index + 1) + ") "}
          {new Date().toUTCString()}
        </p>
        <button
          onClick={handleCopyClick}
          className="bg-[#fff] px-5 py-2 rounded-md hover:bg-[#8d8d8d] transition-all md:text-base text-sm"
        >
          Copy
        </button>
      </div>
      <textarea
        className="w-full outline-none rounded-xl text-white min-h-[25vh] md:min-h-[50vh] bg-[#202020] p-5 tracking-wider font-[300] text-sm"
        defaultValue={text}
      ></textarea>
    </div>
  );
};

export default TextCard;