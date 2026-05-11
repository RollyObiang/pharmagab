// models/Pharmacy.js
const pool = require('../config/db');

const Pharmacy = {
    // Récupérer toutes les pharmacies
    getAll: async () => {
        const result = await pool.query('SELECT * FROM pharmacies');
        return result.rows;
    },

    // Récupérer les pharmacies de garde
    getGarde: async () => {
        const result = await pool.query('SELECT * FROM pharmacies WHERE is_garde = true');
        return result.rows;
    },

    // La fonction de proximité (Calcul direct en SQL)
    getNearest: async (lat, lng) => {
        const query = `
            SELECT *, 
            (6371 * acos(cos(radians($1)) * cos(radians(lat)) * cos(radians(lng) - radians($2)) + sin(radians($1)) * sin(radians(lat)))) 
            AS distance
            FROM pharmacies
            ORDER BY distance ASC
        `;
        const result = await pool.query(query, [lat, lng]);
        return result.rows;
    }
};

module.exports = Pharmacy;