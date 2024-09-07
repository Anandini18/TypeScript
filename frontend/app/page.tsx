// app/page.tsx
"use client"; // Add this line at the top
import TextCard from "@/components/Cards/TextCard";
import convertor from "@/lib/converter";
import React, { useRef, useState } from "react";
import { useRouter } from 'next/navigation';

const Home = () => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [texts, setTexts] = useState<Array<string>>([]);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const userId = 1; // Replace with actual user ID if available

  const openBrowseImage = async () => {
    imageInputRef.current?.click();
  };

  const convert = async (url: string, userId: number) => {
    if (url.length) {
      setProcessing(true);
      try {
        const txt = await convertor(url, userId);
        setTexts(prevTexts => [...prevTexts, txt]);
      } finally {
        setProcessing(false);
      }
    }
  };

  const handleCopy = async (text: string) => {
    try {
      const response = await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }), // Wrap the text in an object
      });

      if (!response.ok) {
        throw new Error("Failed to save text");
      }

      alert("Text copied and saved successfully!");
    } catch (error) {
      console.error("Error saving text:", error);
      alert("Failed to save text.");
    }
  };

  return (
    <div className="min-h-[90vh]">
      <h1 className="text-white text-4xl md:text-6xl text-center px-5 pt-5 font-[800]">
        Built With{" "}
        <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          Tesseract Js{" "}
        </span>
      </h1>
      <input
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          let url: string = URL.createObjectURL(e.target.files?.[0]!);
          convert(url, userId); // Pass userId here
        }}
        ref={imageInputRef}
        type="file"
        hidden
        required
      />
      <div className="relative md:bottom-10 w-full flex flex-col gap-10 items-center justify-center p-5 md:p-20">
        <div
          onClick={openBrowseImage}
          onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
          }}
          onDrop={(e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            let url: string = URL.createObjectURL(e.dataTransfer.files?.[0]!);
            convert(url, userId); // Pass userId here
          }}
          className="w-full min-h-[30vh] md:min-h-[50vh] p-5 bg-[#202020] cursor-pointer rounded-xl flex items-center justify-center"
        >
          <div className="w-full flex items-center justify-center flex-col gap-3">
            <p className="text-2xl md:text-3xl text-center text-[#707070] font-[800]">
              {processing
                ? "Processing Image..."
                : "Browse Or Drop Your Image Here"}
            </p>
          </div>
        </div>
        {texts.map((t, i) => (
          <TextCard key={i} text={t} index={i} onCopy={handleCopy} />
        ))}
      </div>
    </div>
  );
};

export default Home;
