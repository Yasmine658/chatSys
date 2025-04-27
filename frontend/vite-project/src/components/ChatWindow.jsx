import React, { useEffect, useRef } from 'react';

function ChatWindow({ messages, user }) {
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <div key={msg._id} className={msg.sender === user._id ? 'own' : ''}>
          <p>{msg.content}</p>
          <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default ChatWindow;
