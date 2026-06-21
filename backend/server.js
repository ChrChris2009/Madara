const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // URL du frontend en dev
        methods: ["GET", "POST"]
    }
});

// Connexion à MongoDB
connectDB();

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
    console.log(`Utilisateur connecté : ${socket.id}`);

    // Rejoindre une room privée ou de groupe
    socket.on('join_room', (roomId) => {
        socket.join(roomId);
    });

    // Envoi de message
    socket.on('send_message', (data) => {
        // data contient : { room, sender, text, timestamp }
        io.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
        console.log('Utilisateur déconnecté');
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
