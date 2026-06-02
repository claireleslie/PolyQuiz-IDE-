const jwt = require('jsonwebtoken');
const User = require('../models/User');

async function login(req, res) {
  try {
    const { pseudo } = req.body;

    if (!pseudo) {
      return res.status(400).json({ message: 'Le pseudo est requis' });
    }

    // Cherche l'utilisateur, le crée s'il n'existe pas
    let user = await User.findOne({ pseudo: pseudo.toLowerCase() });

    if (!user) {
      user = await User.create({ pseudo: pseudo.toLowerCase() });
    }

    // Génère le token JWT (valide 2 heures)
    const token = jwt.sign(
      { _id: user._id, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token, pseudo: user.pseudo, bestScore: user.bestScore });

  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

module.exports = { login };