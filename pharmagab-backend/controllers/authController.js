const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// --- INSCRIPTION ---
exports.register = async (req, res) => {
    const { nom, email, mot_de_passe, quartier, photo_url } = req.body;
    try {
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }

        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const newUser = await pool.query(
            "INSERT INTO users (nom, email, mot_de_passe, quartier, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, nom, email, quartier",
            [nom, email, hashedPassword, quartier, photo_url || 'https://via.placeholder.com/150']
        );

        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ token, user: newUser.rows[0] });
    } catch (err) {
        console.error("ERREUR REGISTER:", err.message);
        res.status(500).json({ error: "Erreur lors de l'inscription" });
    }
};

// --- CONNEXION ---
exports.login = async (req, res) => {
    const { email, mot_de_passe } = req.body;
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "Email invalide" });

        const validPassword = await bcrypt.compare(mot_de_passe, user.rows[0].mot_de_passe);
        if (!validPassword) return res.status(401).json({ error: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({
            token,
            user: {
                id: user.rows[0].id,
                nom: user.rows[0].nom,
                email: user.rows[0].email,
                quartier: user.rows[0].quartier
            }
        });
    } catch (err) {
        console.error("ERREUR LOGIN:", err.message);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
};

// --- RÉCUPÉRER LE PROFIL ---
exports.getProfile = async (req, res) => {
    try {
        const user = await pool.query(
            "SELECT id, nom, email, quartier, photo_url, created_at FROM users WHERE id = $1",
            [req.user.id]
        );
        if (user.rows.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });
        res.json(user.rows[0]);
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
};

// --- NOUVEAU : METTRE À JOUR LE PROFIL ---
exports.updateProfile = async (req, res) => {
    const { nom, quartier } = req.body;
    const userId = req.user.id; // Récupéré depuis le token par le middleware d'auth

    try {
        const updatedUser = await pool.query(
            "UPDATE users SET nom = $1, quartier = $2 WHERE id = $3 RETURNING id, nom, email, quartier, photo_url",
            [nom, quartier, userId]
        );

        if (updatedUser.rows.length === 0) {
            return res.status(404).json({ error: "Utilisateur non trouvé" });
        }

        res.json({
            message: "Profil mis à jour avec succès",
            user: updatedUser.rows[0]
        });
    } catch (err) {
        console.error("ERREUR UPDATE_PROFILE:", err.message);
        res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
    }
};