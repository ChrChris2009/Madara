import React from 'react';
import './Sidebar.css';

const Sidebar = ({ chats, onSelectChat }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Messages</h2>
            </div>
            <div className="chat-list">
                {chats.map((chat) => (
                    <div key={chat.id} className="chat-item" onClick={() => onSelectChat(chat)}>
                        <div className="avatar-container">
                            <span className="avatar-placeholder">{chat.name[0]}</span>
                            {chat.isOnline && <span className="online-indicator"></span>}
                        </div>
                        <div className="chat-info">
                            <h4>{chat.name}</h4>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;

