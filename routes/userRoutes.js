const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { updateScore, getLeaderboard } = require('../controllers/userController');

// Route protégée → le middleware vérifie le JWT avant le contrôleur
router.post('/score', authMiddleware, updateScore);

// Route publique
router.get('/leaderboard', getLeaderboard);

module.exports = router;