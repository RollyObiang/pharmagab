const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    // 1. On récupère TOUS les champs envoyés par le frontend
    // On utilise "mot_de_passe" pour correspondre au name de l'input React
    const { nom, email, mot_de_passe, quartier, photo_url } = req.body;

    try {
        // Vérification si l'utilisateur existe déjà
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ error: "Cet email est déjà utilisé" });
        }

        // 2. Hashage du mot de passe (on utilise la variable mot_de_passe reçue)
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);

        // 3. Insertion avec les nouveaux champs (quartier et photo_url)
        const newUser = await pool.query(
            "INSERT INTO users (nom, email, mot_de_passe, quartier, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, nom, email, quartier",
            [nom, email, hashedPassword, quartier, photo_url || 'https://via.placeholder.com/150']
        );

        // 4. Génération d'un token immédiatement pour connecter l'utilisateur après inscription
        const token = jwt.sign({ id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({ token, user: newUser.rows[0] });

    } catch (err) {
        console.error("ERREUR REGISTER:", err.message);
        res.status(500).json({ error: "Erreur lors de l'inscription : " + err.message });
    }
};

exports.login = async (req, res) => {
    const { email, mot_de_passe } = req.body; // Changé password en mot_de_passe
    try {
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(401).json({ error: "Email invalide" });

        // On compare avec "mot_de_passe" qui est le nom de la colonne SQL maintenant
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

exports.getProfile = async (req, res) => {
    try {
        // Ajout de quartier et photo_url dans la sélection
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