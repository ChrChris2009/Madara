const Message = require('../models/Message');

// Récupérer l'historique d'une room (privée ou groupe)
exports.getChatHistory = async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await Message.find({ room: roomId })
            .populate('sender', 'username avatar')
            .sort({ createdAt: 1 }); // Tri par ordre chronologique
        
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des messages", error: error.message });
    }
};

// Sauvegarder un message en base de données
exports.saveMessage = async (senderId, text, roomId) => {
    try {
        const newMessage = new Message({
            sender: senderId,
            text,
            room: roomId
        });
        await newMessage.save();
        return await newMessage.populate('sender', 'username avatar');
    } catch (error) {
        console.error("Erreur sauvegarde message:", error);
    }
};

