// À ajouter à l'intérieur du composant ChatArea
const [isSomeoneTyping, setIsSomeoneTyping] = useState(false);
const [typingUser, setTypingUser] = useState('');

useEffect(() => {
    if (!socket) return;

    socket.on('user_typing', (data) => {
        if (data.isTyping) {
            setTypingUser(data.username);
            setIsSomeoneTyping(true);
        } else {
            setIsSomeoneTyping(false);
        }
    });

    return () => socket.off('user_typing');
}, [socket]);

// Fonction déclenchée à chaque frappe dans l'input
const handleInputChange = (e) => {
    setMessageText(e.target.value);

    if (!socket || !activeChat) return;

    // Notifie que l'utilisateur écrit
    socket.emit('typing', {
        room: activeChat.id,
        username: currentUser.username,
        isTyping: e.target.value.length > 0
    });
};

