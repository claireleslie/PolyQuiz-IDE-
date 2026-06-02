const Question = require('../models/Question');

async function getQuestions(req, res) {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
}

module.exports = { getQuestions };