// 1. LES IMPORTS
const express = require('express');
const cors = require('cors');
const morgan = require('morgan'); // On importe morgan
const pool = require('./db');
require('dotenv').config();

// 2. L'INITIALISATION (C'est ici qu'on crée 'app')
const app = express();
const PORT = process.env.PORT || 5000;

// 3. LES MIDDLEWARES (On utilise 'app' après l'avoir créé)
app.use(morgan('dev')); // Maintenant ça va marcher !
app.use(cors());
app.use(express.json());

// 4. LES ROUTES
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Connexion réussie !", time: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur de connexion");
  }
});

app.get('/api/pharmacies/de-garde', async (req, res) => {
    // ... ton code précédent ici ...
});

// 5. LE LANCEMENT
app.listen(PORT, () => {
  console.log(`🚀 Le serveur tourne sur le port ${PORT}`);
});