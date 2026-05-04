const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// --- AJOUT DU TEST DE CONNEXION ---
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erreur de connexion à PostgreSQL :', err.stack);
  }
  console.log('✅ Connecté avec succès à la base de données pharmagab_db');
  release(); // On libère le client pour qu'il retourne dans le pool
});

module.exports = pool;