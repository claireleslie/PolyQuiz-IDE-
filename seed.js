const mongoose = require('mongoose');
require('dotenv').config();
const Question = require('./models/Question');

const questions = [
  {
    category: "F1",
    text: "Qui est surnommé The Michael ?",
    options: ["Hamilton", "Schumacher", "Senna", "Verstappen"],
    correctAnswer: "Schumacher"
  },
  {
    category: "NBA",
    text: "Quelle équipe possède LeBron James ?",
    options: ["Lakers", "Bulls", "Celtics", "Heat"],
    correctAnswer: "Lakers"
  },
  {
    category: "Anime",
    text: "Qui est le héros de Naruto ?",
    options: ["Sasuke", "Naruto", "Luffy", "Goku"],
    correctAnswer: "Naruto"
  },
  {
    category: "Moto GP",
    text: "Quel pilote est surnommé The Doctor ?",
    options: ["Marquez", "Rossi", "Bagnaia", "Lorenzo"],
    correctAnswer: "Rossi"
  },
  {
    category: "NBA",
    text: "Quelle franchise a remporté le plus de titres NBA ?",
    options: ["Lakers", "Celtics", "Warriors", "Bulls"],
    correctAnswer: "Celtics"
  },
  {
    category: "Anime",
    text: "Qui est le capitaine des Mugiwara dans One Piece ?",
    options: ["Zoro", "Sanji", "Luffy", "Ace"],
    correctAnswer: "Luffy"
  },
  {
    category: "F1",
    text: "Quelle écurie utilise le cheval cabré comme logo ?",
    options: ["Mercedes", "Ferrari", "McLaren", "Red Bull"],
    correctAnswer: "Ferrari"
  },
  {
    category: "Anime",
    text: "Quel est le nom du carnet dans Death Note ?",
    options: ["Dark Book", "Death Note", "Shinigami Book", "Shadow Note"],
    correctAnswer: "Death Note"
  },
  {
    category: "NBA",
    text: "Quel joueur est surnommé The King ?",
    options: ["Jordan", "Bryant", "LeBron James", "Curry"],
    correctAnswer: "LeBron James"
  },
  {
    category: "F1",
    text: "Quel pilote néerlandais domine actuellement la F1 ?",
    options: ["Hamilton", "Alonso", "Verstappen", "Perez"],
    correctAnswer: "Verstappen"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connecté à MongoDB');

    await Question.deleteMany();
    console.log('🗑️ Anciennes questions supprimées');

    await Question.insertMany(questions);
    console.log('✅ 10 questions insérées avec succès');

    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur lors du seeding :', err);
    process.exit(1);
  }
}

seed();