import React, { useState } from "react";

const ChatWindow = ({ chat, closeChat }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there!", sender: "them" },
    { id: 2, text: "Hello! How can I help?", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: "me" }]);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
            {chat.name[0]}
          </div>
          <p className="ml-3 text-lg font-semibold">{chat.name}</p>
        </div>
        <button
          onClick={closeChat}
          className="text-gray-400 hover:text-white"
        >
          Close
        </button>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-900">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-lg ${
                msg.sender === "me"
                  ? "bg-green-600 text-white"
                  : "bg-gray-700 text-gray-200"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center px-4 py-3 bg-gray-800">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
