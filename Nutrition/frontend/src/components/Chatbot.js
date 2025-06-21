import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Importing the CSS file

const Chatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse(""); // Clear previous response

    try {
      const res = await axios.post("http://localhost:5000/chatbot", { message });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error fetching response:", error.message);
      setResponse("❌ Failed to fetch response. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <h2>🍎 Nutrition Chatbot</h2>
      <textarea
        className="chatbot-input"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask about food nutrition..."
      />
      <button
        className={`chatbot-button ${loading ? "disabled" : ""}`}
        onClick={handleSendMessage}
        disabled={loading}
      >
        {loading ? "Loading..." : "Ask"}
      </button>
      {response && <div className="chatbot-response">{response}</div>}
    </div>
  );
};

export default Chatbot;
