
import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";

import { sendChatMessage } from "../services/chatService";
import ReactMarkdown from "react-markdown";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();

    const userMessage = {
      id: Date.now(),
      text: question,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call API service
      const data = await sendChatMessage(question);

      const botMessage = {
        id: Date.now() + 1,
        text: data.answer,
        sender: "assistant",
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Chat Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: error.message || "Something went wrong. Please try again.",
          sender: "assistant",
        },
      ]);

    } finally {
      setLoading(false);
    }
  };

  // New Chat
  const newChat = () => {
    setMessages([]);
    setInput("");
  };

  return (
    <div className="chat-container">

      {/* Header */}
      <div className="chat-header">
        <h3 style={{ marginLeft: "20%" }}>
          Medical Assistant
        </h3>

        <button
          className="new-chat-btn"
          onClick={newChat}
        >
          + New Chat
        </button>
      </div>

      {/* Chat Messages */}
      <div className="chat-messages">

        {messages.length === 0 ? (
          <div className="welcome-screen">
            <h1>What can I help with?</h1>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`message-row ${msg.sender}`}
            >
              <div className="message-bubble">
               {/* <p>{msg.text}</p>  */}
                 <div className="message-content">
        {/* {msg.text} */}
            <ReactMarkdown>
       {msg.text || ""}
    </ReactMarkdown>
  </div>
              </div>
            </div>
          ))
        )}

        {/* Loading */}
        {loading && (
          <div className="message-row assistant">
            <div className="message-bubble">
              Thinking...
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />

      </div>

      {/* Input Area */}
      <div className="chat-input-wrapper">

        <div className="chat-input-box">

          <textarea
            placeholder="Ask your medical question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            rows={1}
          />

          <button
            className="send-btn"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
          >
            ↑
          </button>

        </div>

        <p className="input-footer">
          Medical Assistant can make mistakes.
          Consult a qualified healthcare professional &#169; 2026 DV. All Rights Reserved..
        </p>

      </div>

    </div>
  );
};

export default Chat;
