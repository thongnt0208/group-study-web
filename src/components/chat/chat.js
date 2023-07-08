import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../styles/chat.scss';
import { isExpired, decodeToken } from "react-jwt";

import useChat from "./useChat.js";

const Chat = (props) => {
  const groupId = props.groupId;
  const { messages, sendMessage } = useChat(groupId); // Creates a websocket and manages messaging
  const [newMessage, setNewMessage] = useState(""); // Message to be sent
  // const [currentUser, setCurrentUser] = useState(null);// Current user

  // //Get current user object
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   // Decode JWT token
  //   const decodedToken = decodeToken(token.replace('Bearer ', ''));
  //   setCurrentUser(decodedToken);
  //   console.log('User chatting: ', currentUser);
  // }, []);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    sendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div className="chat-room-container">
      <h1 className="room-name">Chat box</h1>
      <div className="messages-container">
        <ol className="messages-list">
          {messages.map((message, i) => (
            <li
              key={i}
              className={`message-item ${message.ownedByCurrentUser ? "my-message" : "received-message"
                }`}
            >
              <span className="message-sender">{message.ownedByCurrentUser ? "You" : message.senderName}: </span>
              <span className="message-body">{message.body}</span>
            </li>
          ))}
        </ol>
      </div>
      <textarea
        value={newMessage}
        onChange={handleNewMessageChange}
        placeholder="Write message..."
        className="new-message-input-field"
      />
      <button onClick={handleSendMessage} className="send-message-button">
        Send
      </button>
    </div>
  );
};

Chat.propTypes = {
  groupId: PropTypes.string.isRequired,
};

export default Chat;
