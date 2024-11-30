import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaEllipsisH } from 'react-icons/fa';
import Message from './message';
import MessageInput from './msginput';

const Container = styled.div`
  // position: fixed;
  bottom: 0;
  right: 0;
  width: 1150px; 
  height: 400px;
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  // z-index: 9999; /* Make sure it's on top */
`;

const Sidebar = styled.div`
  width: 50%;
  background-color: #ffffff;
  border-bottom: 1px solid #ccc;
`;

const ChatWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 5px;
  background-color: #075e54;
  color: white;
  // display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  padding: 10px;
  border-radius: 20px;
  // margin-bottom: 10px;
`;

const Input = styled.input`
  // border: none;
  outline: none;
  width: 100%;
  margin-left: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
  background-color: #e5ddd5;
`;

const Footer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
`;

const ChatApp = () => {
    const [messages, setMessages] = useState([
        { text: 'Hey, how are you?', sender: 'user' },
        { text: 'I am good, thanks!', sender: 'friend' },
    ]);

    return (
        <Container>
            <Sidebar>
                <SearchBar>
                    <FaSearch />
                    <Input placeholder="Search" />
                </SearchBar>
                {/* Add contact list or sidebar items */}
            </Sidebar>

            <ChatWindow>
                <Header>
                    <div>Friend's Name</div>
                    <FaEllipsisH />
                </Header>

                <MainContent>
                    {messages.map((msg, index) => (
                        <Message key={index} message={msg} />
                    ))}
                </MainContent>

                <Footer>
                    <MessageInput setMessages={setMessages} />
                </Footer>
            </ChatWindow>
        </Container>
    );
};

export default ChatApp;
