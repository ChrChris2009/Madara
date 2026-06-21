import React, { useState } from 'react';
import { SocketProvider } from './context/SocketContext';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import './App.css';

function App() {
    // Simulation d'un utilisateur connecté (à lier avec votre système d'authentification)
    const [currentUser] = useState({ id: 'user_chrisst', username: 'chrisst' });
    const [activeChat, setActiveChat] = useState(null);

    // Fausses données pour calquer sur vos captures d'écran
    const [chats] = useState([
        { id: 'room_celestin', name: 'Celestin', lastMessage: 'Vous êtes à combien ?', isOnline: true },
        { id: 'room_cassid_bot', name: 'Cassidy-bot', lastMessage: 'Salut', isOnline: false }
    ]);

    return (
        <SocketProvider>
            <div className="app-container">
                <Sidebar chats={chats} onSelectChat={setActiveChat} />
                <ChatArea activeChat={activeChat} currentUser={currentUser} />
            </div>
        </SocketProvider>
    );
}

export default App;

