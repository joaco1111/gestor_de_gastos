import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import CloseIcon from '@mui/icons-material/Close';

const Chat = () => {

  const token = JSON.parse(localStorage.getItem('loggedNoteAppUser'))?.name;
  const userId = JSON.parse(localStorage.getItem('loggedNoteAppUser')).id;

  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState(() => {
    const storedMessages = localStorage.getItem('chatMessages');
    return storedMessages ? JSON.parse(storedMessages) : [];
  });
  console.log(messages);
  const [inputMessage, setInputMessage] = useState('');
  const socket = io('http://localhost:3001', {
    auth: {
        token
    }
  });

    useEffect(() => {
      // Join room when component mounts
      joinRoom();

      socket.on('chat_message', (data) => {
        setMessages((prevMessages) => {
          const newMessages = [...prevMessages, data];
          localStorage.setItem('chatMessages', JSON.stringify(newMessages));
          return newMessages;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [messages]);

  const joinRoom = () => {
    if (socket) {
      socket.emit('join_room', `userRoom-${userId}`);
    }
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const sendMessage = () => {
    const messageData = {
      username: token,  // Usamos el nombre de usuario del token como emisor del mensaje
      message: inputMessage
    };
  
    socket.emit('mensaje', messageData);
    setInputMessage('');
  };
  
  const clearChat = () => {
    localStorage.removeItem('chatMessages');
    setMessages([]);
  };

  return (
    <div>
      <button onClick={toggleChat} style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999, border: "1px solid black", borderRadius: "10px", color: 'blue' }}>
        {showChat ? <CloseIcon fontSize='large'/> : <ChatBubbleIcon fontSize='large'/>}
      </button>
      {showChat && (
        <div
          style={{
            position: 'fixed',
            bottom: 100,
            right: 20,
            width: 300,
            height: 500,
            background: 'rgba(241, 241, 241, 0.8)', 
            border: '1px solid #ccc',
            borderRadius: 5,
            overflow: 'hidden',
            boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
            zIndex: 9999,
            
          }}
        >
          <h1>Chat en tiempo real</h1>
          <ul style={{ overflowY: 'scroll', height: '80%', listStyleType: 'none', padding: 0 }}>
          {messages.map((message, index) => (
             <li key={index} style={{ background: index % 2 === 0 ? 'none' : 'rgba(0, 0, 0, 0.1)' }}>
              {message.username}: {message.message}
         </li>
        ))}

          </ul>
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button style={{border: "1px solid black", borderRadius: "5px", marginLeft: "5px"}}onClick={sendMessage}>Enviar</button>
          <button style={{border: "1px solid black", borderRadius: "5px", marginLeft: "10px"}}onClick={clearChat}>x</button>

        </div>
      )}
    </div>
  );
};

export default Chat;
