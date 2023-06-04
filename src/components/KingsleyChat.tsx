import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

interface IChat {
  from: 'user' | 'bot';
  message: string;
}

const KingsleyChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [chats, setChats] = useState<IChat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<null | HTMLDivElement>(null);

  const determineResponse = (question: string, aiResponse: string) => {
    if (question.toLowerCase().includes('rent')) {
      return 'The rent is 1000 euro per month and must be paid by the 15th of each month.';
    } else if (question.toLowerCase().includes('guests')) {
      return 'No more than 4 guests are allowed at any one time.';
    } else if (aiResponse) {
      return aiResponse;
    } else {
      return 'As an AI Chatbot developed by Kingsley AI, I am tasked with answering questions related to your tenancy only.';
    }
  };

  const askQuestion = async (question: string) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/ask', { question });
      const aiResponse = response.data.data;
      setIsLoading(false);
      return determineResponse(question, aiResponse);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      return 'Sorry, there was an error processing your request. Please try again later.';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setChats((prevChats) => [...prevChats, { from: 'user', message: input }]);

    const botResponse = await askQuestion(input);

    setChats((prevChats) => [...prevChats, { from: 'bot', message: botResponse }]);

    setInput('');
  };

  const scrollToBottom = () => {
    if(chatEndRef.current !== null) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(scrollToBottom, [chats]);

  return (
    <div>
      <div>
        {chats.map((chat, i) => (
          <div key={i}>
            <strong>{chat.from}:</strong> {chat.message}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>

      {isLoading && <p>Thinking...</p>}
    </div>
  );
};

export default KingsleyChat;