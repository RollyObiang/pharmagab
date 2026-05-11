const { Pool } = require('pg');
require('dotenv').config();

// On utilise l'URL complète de Neon (DATABASE_URL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Indispensable pour se connecter aux serveurs Cloud comme Neon
  }
});

// --- TEST DE CONNEXION ---
pool.connect((err, client, release) => {
  if (err) {
    return console.error('❌ Erreur de connexion à Neon PostgreSQL :', err.stack);
  }
  console.log('✅ Connecté avec succès à la base de données PharmaGab sur Neon');
  release();
});

module.exports = pool;