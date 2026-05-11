const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// 1. IMPORTATION DES ROUTES
const authRoutes = require('./routes/authRoutes');
const pharmaRoutes = require('./routes/pharmaRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// 2. MIDDLEWARES
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// 3. UTILISATION DES ROUTES
// Toutes les routes d'auth commenceront par /api/auth
app.use('/api/auth', authRoutes);

// Toutes les routes de pharmacies commenceront par /api/pharmacies
app.use('/api/pharmacies', pharmaRoutes);

// 4. TEST DE CONNEXION (Utilise ton db.js situé dans le dossier config)
const pool = require('./config/db'); 

app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Connexion réussie au Gabon ! 🇬🇦", time: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur de connexion à PostgreSQL");
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Serveur PharmaGab lancé sur le port ${PORT}`);
  });
}

// Requis par Vercel pour le déploiement serverless
module.exports = app;