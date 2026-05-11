const Pharmacy = require('../models/Pharmacy');

// Récupérer toutes les pharmacies
exports.getAllPharmacies = async (req, res) => {
    try {
        const pharmacies = await Pharmacy.getAll();
        res.json(pharmacies);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur lors de la récupération des pharmacies");
    }
};

// Récupérer les pharmacies de garde
exports.getPharmaciesDeGarde = async (req, res) => {
    try {
        const pharmacies = await Pharmacy.getGarde();
        res.json(pharmacies);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur lors de la récupération des pharmacies de garde");
    }
};

// Récupérer les pharmacies les plus proches
exports.getNearest = async (req, res) => {
    const { lat, lng } = req.query; // Position de l'utilisateur envoyée par le téléphone

    if (!lat || !lng) {
        return res.status(400).send("Les paramètres 'lat' et 'lng' sont requis.");
    }

    try {
        const pharmacies = await Pharmacy.getNearest(lat, lng);
        res.json(pharmacies);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur serveur lors du calcul de proximité");
    }
};