const express = require('express');
const router = express.Router();
const { getChatHistory } = require('../controllers/messageController');
// Note : Tu pourras ajouter un middleware d'authentification ici plus tard
router.get('/:roomId', getChatHistory);

module.exports = router;

