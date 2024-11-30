// import React from "react";
// import "./ChatComponent.css";

// const ChatComponent = () => {
//   const chats = [
//     { name: "*ADGIPS UNOFFICIAL*", message: "This message was deleted.", type: "system" },
//     { name: "Anchal", message: "Ok", type: "user" },
//     {
//       name: "Arnav Kushwaha",
//       message: "Reacted 👍 to 'Bkl Mera sticker bhejna band kr'",
//       type: "reaction",
//     },
//     { name: "Arnav", message: "😴", type: "sticker" },
//     { name: "Archit Goel", message: "https://youtube.com/shorts/Zcp...", type: "link" },
//     { name: "Raunak Gola (You)", message: "Os-10 Daa-12 Fodl-14-sat...", type: "user" },
//     { name: "Shivangi Gupta", message: "Kya kya samajhna h?", type: "user" },
//     { name: "Princka", message: "Okay", type: "user" },
//     { name: "Vishal GHPS", message: "You reacted ❤️ to 'Hn'", type: "reaction" },
//     {
//       name: "Anchal",
//       message:
//         "isme msg wala code bhi h\nek baar dekh le itne m zara alignment try krti hu",
//       type: "user",
//     },
//     { name: "Anchal", message: "Voh mai dekh lunga 👍", type: "user" },
//   ];

//   return (
//     <div className="chat-container">
//       <div className="chat-header">Chats</div>
//       <div className="chat-search">
//         <input
//           type="text"
//           placeholder="Search chats"
//           className="search-input"
//         />
//       </div>
//       <div className="chat-list">
//         {chats.map((chat, index) => (
//           <div
//             key={index}
//             className={`chat-item ${
//               chat.type === "system" ? "system-message" : ""
//             }`}
//           >
//             <div className="chat-avatar">
//               <span>{chat.name[0]}</span>
//             </div>
//             <div className="chat-content">
//               <div className="chat-name">{chat.name}</div>
//               <div className="chat-message">{chat.message}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ChatComponent;


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState } from "react";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import "./ChatComponent.css";

const ChatComponent = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  const chats = [
    { id: 1, name: "Anchal", lastMessage: "Voh mai dekh lunga 👍" },
    { id: 2, name: "Arnav Kushwaha", lastMessage: "Reacted 👍 to your message" },
    { id: 3, name: "Archit Goel", lastMessage: "https://youtube.com/..." },
    { id: 4, name: "Shivangi Gupta", lastMessage: "Kya kya samajhna h?" },
    { id: 5, name: "Princka", lastMessage: "Okay" },
    { id: 6, name: "Vishal GHPS", lastMessage: "You reacted ❤️ to 'Hn'" },
  ];

  const openChat = (chat) => {
    setSelectedChat(chat);
  };

  const closeChat = () => {
    setSelectedChat(null);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
        
      <div className="w-1/3 bg-gray-800 border-r border-gray-700">
        <ChatList chats={chats} openChat={openChat} />
      </div>
      <div className="flex-grow">
        {selectedChat ? (
          <ChatWindow chat={selectedChat} closeChat={closeChat} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-400">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatComponent;

