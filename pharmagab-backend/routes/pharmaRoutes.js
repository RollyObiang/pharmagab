const express = require('express');
const router = express.Router();
const pharmaController = require('../controllers/pharmaController');

// Route pour récupérer toutes les pharmacies (GET /api/pharmacies)
router.get('/', pharmaController.getAllPharmacies);

// Route pour récupérer les pharmacies de garde (GET /api/pharmacies/garde)
router.get('/garde', pharmaController.getPharmaciesDeGarde);

// Route pour récupérer les pharmacies à proximité (GET /api/pharmacies/proximite)
router.get('/proximite', pharmaController.getNearest);

module.exports = router;