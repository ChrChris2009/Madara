const express = require('express');
const router = express.Router();
const { createGroup, getUserGroups } = require('../controllers/groupController');
const auth = require('../middleware/authMiddleware');

// Protection des routes de groupe avec le middleware de sécurité
router.post('/', auth, createGroup);
router.get('/user/:userId', auth, getUserGroups);

module.exports = router;

