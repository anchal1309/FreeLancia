import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputField = styled.input`
  width: 90%;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin-right: 10px;
  outline: none;
`;

const SendButton = styled.button`
  background-color: #075e54;
  border: none;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
  color: white;
`;

const MessageInput = ({ setMessages }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: message, sender: 'user' },
            ]);
            setMessage('');
        }
    };

    return (
        <InputWrapper>
            <InputField
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
            />
            <SendButton onClick={handleSend}>
                <FaPaperPlane />
            </SendButton>
        </InputWrapper>
    );
};

export default MessageInput;
