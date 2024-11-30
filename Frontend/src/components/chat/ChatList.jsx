// import React from "react";

// const ChatList = ({ chats, openChat }) => {
//   return (
//     <div className="h-full overflow-y-auto">
//       <div className="p-4 text-lg font-bold text-gray-300">Archived Chats</div>
//       {chats.map((chat) => (
//         <div
//           key={chat.id}
//           onClick={() => openChat(chat)}
//           className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700"
//         >
//           <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
//             {chat.name[0]}
//           </div>
//           <div className="ml-4">
//             <p className="text-sm font-semibold">{chat.name}</p>
//             <p className="text-xs text-gray-400 truncate">{chat.lastMessage}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ChatList;


// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";

const ChatList = ({ chats, openChat }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter chats based on search term
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full overflow-y-auto">
      {/* Search Bar */}
      <div className="p-4 bg-gray-800 border-b border-gray-700">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search chats..."
            className="w-full px-4 py-2 text-sm text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-green-600"
          />
          <div className="absolute inset-y-0 right-3 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m1.5-5.65a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Archived Chats Header */}
      <div className="p-4 text-lg font-bold text-gray-300">Archived Chats</div>

      {/* Chat List */}
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => openChat(chat)}
            className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700"
          >
            <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold">
              {chat.name[0]}
            </div>
            <div className="ml-4">
              <p className="text-sm font-semibold">{chat.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {chat.lastMessage}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="p-4 text-center text-gray-400">
          No chats match your search.
        </div>
      )}
    </div>
  );
};

export default ChatList;


