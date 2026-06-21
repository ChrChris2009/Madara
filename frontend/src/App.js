import React, { useState, useEffect } from 'react';
import { SocketProvider } from './context/SocketContext';
import Sidebar from './components/Sidebar';
import ChatArea from './components/ChatArea';
import Auth from './pages/Auth';
import './App.css';

function App() {
    const [currentUser, setCurrentUser] = useState(null);
    const [activeChat, setActiveChat] = useState(null);
    const [chats] = useState([
        { id: 'room_celestin', name: 'Celestin', lastMessage: 'Vous êtes à combien ?', isOnline: true },
        { id: 'room_cassid_bot', name: 'Cassidy-bot', lastMessage: 'Salut', isOnline: false }
    ]);

    // Persistance de la session au rechargement
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionnel : Ajouter un fetch vers /api/auth/me pour récupérer l'utilisateur via le token
            setCurrentUser({ id: 'user_chrisst', username: 'chrisst' }); 
        }
    }, []);

    if (!currentUser) {
        return <Auth onAuthSuccess={setCurrentUser} />;
    }

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
