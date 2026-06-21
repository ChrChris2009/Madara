import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '../context/SocketContext';
import './ChatArea.css';

const ChatArea = ({ activeChat, currentUser }) => {
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);
    const socket = useSocket();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!socket || !activeChat) return;

        socket.emit('join_room', activeChat.id);

        socket.on('receive_message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, [socket, activeChat]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!messageText.trim()) return;

        const messageData = {
            room: activeChat.id,
            sender: currentUser.id,
            text: messageText,
            timestamp: new Date()
        };

        socket.emit('send_message', messageData);
        setMessageText('');
    };

    if (!activeChat) return <div className="chat-empty">Sélectionnez une discussion pour commencer 💬</div>;

    return (
        <div className="chat-area">
            <div className="chat-header">
                <h3>{activeChat.name}</h3>
            </div>
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-row ${msg.sender === currentUser.id ? 'sent' : 'received'}`}>
                        <div className="message-bubble">{msg.text}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form className="chat-input-form" onSubmit={handleSendMessage}>
                <input 
                    type="text" 
                    placeholder="Votre message..." 
                    value={messageText} 
                    onChange={(e) => setMessageText(e.target.value)} 
                />
                <button type="submit">🛩</button>
            </form>
        </div>
    );
};

export default ChatArea;

