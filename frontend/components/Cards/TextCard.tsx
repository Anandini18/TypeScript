import React from "react";
import { toast } from 'react-toastify'; // Import toast for showing messages

interface TextCardProps {
  text: string;
  index: number;
  onCopy: (text: string) => void;
}

const TextCard: React.FC<TextCardProps> = ({ text, index, onCopy }) => {
  // Function to copy text to clipboard and display success message
  const copyToClipboard = (txt: string) => {
    navigator.clipboard.writeText(txt);
    toast.success("Copied to clipboard!"); // Show success message
  };

  const handleCopyClick = () => {
    copyToClipboard(text);
    onCopy(text); // Call the onCopy function to save text to the database
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
