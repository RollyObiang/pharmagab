// controllers/authController.js
const pool = require('../config/db'); // Chemin corrigé pour trouver db.js dans le dossier config
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { nom, email, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await pool.query(
            "INSERT INTO users (nom, email, password) VALUES ($1, $2, $3) RETURNING id, nom, email",
            [nom, email, hashedPassword]
        );
        res.status(201).json(newUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "Email invalide" });

        const validPassword = await bcrypt.compare(password, user.rows[0].password);
        if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.json({ token, user: { id: user.rows[0].id, nom: user.rows[0].nom, email: user.rows[0].email } });
    } catch (err) {
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};