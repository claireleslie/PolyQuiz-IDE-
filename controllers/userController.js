const User = require('../models/User');

// Met à jour le score si meilleur
async function updateScore(req, res) {
  try {
    const { score } = req.body;
    const userId = req.user._id;  // ← Vient du middleware JWT

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Met à jour UNIQUEMENT si le nouveau score est strictement supérieur
    if (score > user.bestScore) {
      user.bestScore = score;
      await user.save();
    }

    res.json({ message: 'Score traité', bestScore: user.bestScore });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

// Classement TOP 10
async function getLeaderboard(req, res) {
  try {
    const leaderboard = await User
      .find()
      .sort({ bestScore: -1 })
      .limit(10)
      .select('pseudo bestScore -_id');  // Seulement pseudo et score, pas d'infos sensibles

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

module.exports = { updateScore, getLeaderboard };