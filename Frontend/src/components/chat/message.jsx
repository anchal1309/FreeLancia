import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  justify-content: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
`;

const MessageBubble = styled.div`
  background-color: ${(props) => (props.isUser ? '#dcf8c6' : '#ffffff')};
  color: ${(props) => (props.isUser ? '#000000' : '#000000')};
  padding: 8px 15px;
  border-radius: 10px;
  max-width: 70%;
  word-wrap: break-word;
`;

const Message = ({ message }) => {
    const isUser = message.sender === 'user';

    return (
        <MessageWrapper isUser={isUser}>
            <MessageBubble isUser={isUser}>{message.text}</MessageBubble>
        </MessageWrapper>
    );
};

export default Message;
