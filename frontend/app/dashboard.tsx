import { useEffect, useState } from "react";
import axios from "axios";
import TextCard from "../components/Cards/TextCard";
import { useRouter } from 'next/navigation';

// Define the type for text items
type TextItem = {
  id: number;
  extractedText: string;
};

const Dashboard = () => {
  const [texts, setTexts] = useState<TextItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("/api/text/list");
        setTexts(result.data);
      } catch (error) {
        console.error("There was an error fetching the texts!", error);
      }
    };

    fetchData();
  }, []);

  const deleteText = async (id: number) => {
    try {
      await axios.delete(`/api/text/delete/${id}`);
      setTexts((prevTexts) => prevTexts.filter((text) => text.id !== id));
    } catch (error) {
      console.error("There was an error deleting the text!", error);
    }
  };

  const handleCopy = (copiedText: string) => {
    console.log("Copied text:", copiedText);
    // Here you can implement additional logic if needed when text is copied
  };

  return (
    <div>
      {texts.map((text, index) => (
        <div key={text.id}>
          <TextCard
            text={text.extractedText}
            index={index}
            onCopy={handleCopy}
          />
          <button onClick={() => deleteText(text.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
