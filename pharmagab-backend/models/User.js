// models/User.js
const pool = require('../config/db');

const User = {
    // Trouver un utilisateur par son email (pour la connexion)
    findByEmail: async (email) => {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    // Créer un nouvel utilisateur (pour l'inscription)
    create: async (nom, email, password) => {
        const result = await pool.query(
            'INSERT INTO users (nom, email, password) VALUES ($1, $2, $3) RETURNING id, nom, email',
            [nom, email, password]
        );
        return result.rows[0];
    }
};

module.exports = User;