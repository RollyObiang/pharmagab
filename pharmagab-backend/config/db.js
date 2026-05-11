const { Pool } = require('pg');
require('dotenv').config();

// On utilise DATABASE_URL s'il existe (pour Neon), sinon on garde l'ancienne config (pour le local)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Obligatoire pour Neon en mode sécurisé
  }
});

module.exports = pool;
// --- AJOUT DU TEST DE CONNEXION ---
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erreur de connexion à PostgreSQL :', err.stack);
  }
  console.log('✅ Connecté avec succès à la base de données pharmagab_db');
  release(); // On libère le client pour qu'il retourne dans le pool
});

module.exports = pool;