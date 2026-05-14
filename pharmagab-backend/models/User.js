const pool = require('../config/db');

const User = {
    // Trouver un utilisateur par son email
    findByEmail: async (email) => {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    },

    // Créer un nouvel utilisateur avec TOUS les champs nécessaires
    create: async (nom, email, mot_de_passe, quartier, photo_url) => {
        const result = await pool.query(
            `INSERT INTO users (nom, email, mot_de_passe, quartier, photo_url) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, nom, email, quartier, photo_url`,
            [
                nom,
                email,
                mot_de_passe,
                quartier,
                photo_url || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
            ]
        );
        return result.rows[0];
    }
};

module.exports = User;