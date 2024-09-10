"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TextData {
  id: number;
  extractedText: string;
}

const TextsPage = () => {
  const router = useRouter();
  const [texts, setTexts] = useState<TextData[]>([]);

  // Retrieve token from localStorage
  const token = localStorage.getItem('authToken');

  useEffect(() => {
    // Fetch extracted texts for the logged-in user
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/texts", {
          headers: {
            'Authorization': `Bearer ${token}` // Include token in header
          }
        });
        setTexts(response.data);
      } catch (error) {
        console.error("Error fetching texts:", error);
      }
    };
    fetchData();
  }, [token]); // Add token as dependency

  const handleExtractAgainClick = () => {
    router.push("/extract"); // Redirect to the extraction page
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/texts/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Include token in header
        }
      });
      setTexts(texts.filter((text) => text.id !== id)); // Update the state after deletion
      toast.success("Text deleted successfully!");
    } catch (error) {
      toast.error("Error deleting text.");
    }
  };

  return (
    <div className="min-h-[90vh]">
      <h1 className="text-4xl text-black text-center mb-10">Your Extracted Texts</h1>
      <div className="flex justify-center mb-5">
        <button
          onClick={handleExtractAgainClick}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Extract Text Again
        </button>
      </div>
      
      {/* Table to display the texts */}
      <div className="flex justify-center">
        <table className="table-auto w-3/4 ">
          <thead>
            <tr>
              <th className="px-4 py-2 border">S.No</th>
              <th className="px-4 py-2 border">Extracted Text</th>
              <th className="px-4 py-2 border">Copy</th>
              <th className="px-4 py-2 border">Delete</th>
            </tr>
          </thead>
          <tbody>
            {texts.map((textData, index) => (
              <tr key={textData.id}>
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{textData.extractedText}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleCopy(textData.extractedText)}
                    className="bg-blue-500 text-black px-3 py-1 rounded-md hover:bg-blue-600"
                  >
                    Copy
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(textData.id)}
                    className="bg-red-500 text-black px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TextsPage;
