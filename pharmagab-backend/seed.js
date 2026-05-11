const pool = require('./config/db');

const pharmacies = [
  { nom: "Pharmacie d'Acae", quartier: "Acae", ville: "Libreville", open: "08h00", close: "21h00", isGarde: true, tel: "+24111705800", assurances: ["CNAMGS", "ASCOMA", "NSIA"], image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?q=80&w=1000", lat: 0.3542, lng: 9.4785 },
  { nom: "Pharmacie de Glass", quartier: "Glass", ville: "Libreville", open: "07h30", close: "22h00", isGarde: false, tel: "+24111743040", assurances: ["CNAMGS", "ASCOMA", "NSIA", "SUNU"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.3789, lng: 9.4472 },
  { nom: "Pharmacie d'Okala", quartier: "Okala", ville: "Libreville", open: "08h00", close: "20h30", isGarde: false, tel: "+24166251212", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000", lat: 0.4725, lng: 9.4128 },
  { nom: "Pharmacie Les Lauriers", quartier: "Bas de Gué-Gué", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111443410", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.4358, lng: 9.4261 },
  { nom: "Pharmacie RAPHA-EL pk12", quartier: "PK12", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24177551020", assurances: ["CNAMGS", "SUNU"], image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000", lat: 0.3852, lng: 9.5320 },
  { nom: "Pharmacie des Facultés", quartier: "Ancienne Sobraga", ville: "Libreville", open: "08h00", close: "20h30", isGarde: false, tel: "+24111734045", assurances: ["CNAMGS", "NSIA"], image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000", lat: 0.4189, lng: 9.4532 },
  { nom: "Pharmacie de Garde de Nzeng Ayong", quartier: "Nzeng Ayong", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111715050", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.3950, lng: 9.4890 },
  { nom: "Pharmacie de Nzeng Ayong", quartier: "Nzeng Ayong", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111715051", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000", lat: 0.3955, lng: 9.4895 },
  { nom: "Pharmacie du Commissariat Central", quartier: "Centre Ville", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111722020", assurances: ["CNAMGS", "AXA"], image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=1000", lat: 0.4000, lng: 9.4450 },
  { nom: "La Nouvelle Pharmacie d'Awondo", quartier: "Awondo", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111445707", assurances: ["CNAMGS", "ASCOMA", "NSIA"], image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000", lat: 0.3721, lng: 9.4650 },
  { nom: "Pharmacie Des Forestiers", quartier: "Mbolo", ville: "Libreville", open: "08h30", close: "20h00", isGarde: false, tel: "+24111722352", assurances: ["CNAMGS", "ASCOMA", "SUNU"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.4025, lng: 9.4442 },
  { nom: "Pharmacie Nouo Cecile", quartier: "Ozangué", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24165302010", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=1000", lat: 0.3721, lng: 9.4650 },
  { nom: "Pharmacie La Kiyine", quartier: "Derrière la prison", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111700315", assurances: ["CNAMGS", "AXA"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.3800, lng: 9.4700 },
  { nom: "Pharmacie Jeanne et Léo", quartier: "Owendo SNI", ville: "Libreville", open: "08h00", close: "20h30", isGarde: false, tel: "+24111701020", assurances: ["CNAMGS", "NSIA"], image: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?q=80&w=1000", lat: 0.3120, lng: 9.4910 },
  { nom: "Pharmacie Sainte Marie", quartier: "Boulevard Triomphal", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111740052", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3995, lng: 9.4510 },
  { nom: "Pharmacie de la Grâce", quartier: "Angondjé", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111770000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=1000", lat: 0.3900, lng: 9.4700 },
  { nom: "Pharmacie d'Oloumi", quartier: "Oloumi", ville: "Libreville", open: "08h00", close: "20h30", isGarde: false, tel: "+24111724039", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.3800, lng: 9.4550 },
  { nom: "Pharmacie de derrière la prison", quartier: "Centrale", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111760000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.4050, lng: 9.4480 },
  { nom: "Pharmacie Mieux-Vivre", quartier: "Beau-séjour", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111740000", assurances: ["CNAMGS", "NSIA"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3800, lng: 9.4800 },
  { nom: "Pharmacie Des GUEGUE", quartier: "Gué-Gué", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111442030", assurances: ["CNAMGS", "SUNU"], image: "https://images.unsplash.com/photo-1587854680352-936b22b91030?q=80&w=1000", lat: 0.4410, lng: 9.4230 },
  { nom: "Pharmacie le President", quartier: "Petit Paris", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111720000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1547489432-cf93fa6c71ee?q=80&w=1000", lat: 0.4020, lng: 9.4420 },
  { nom: "Pharmacie La Libreviloise", quartier: "Centre Ville", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111722424", assurances: ["CNAMGS", "AXA"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.4010, lng: 9.4430 },
  { nom: "Pharmacie La Lowé", quartier: "Cité de la SNI - OWENDO", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111700000", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.3500, lng: 9.5000 },
  { nom: "Pharmacie NOTRE DAME", quartier: "Bel Air", ville: "Libreville", open: "08h00", close: "22h30", isGarde: false, tel: "+24111740000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.3800, lng: 9.4600 },
  { nom: "Grande Pharmacie l'Acacia", quartier: "PK 5", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24166414186", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.3985, lng: 9.4621 },
  { nom: "Pharmacie de Garde du PK 6", quartier: "PK 6", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24166504116", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.4076, lng: 9.4728 },
  { nom: "Pharmacie Nibigholet", quartier: "PK 8", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24166770347", assurances: ["CNAMGS", "NSIA"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.4090, lng: 9.4914 },
  { nom: "Pharmacie du Carrefour SGA", quartier: "PK 8", ville: "Libreville", open: "08h00", close: "20h00", isGarde: false, tel: "Non disponible", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.4100, lng: 9.4950 },
  { nom: "Pharmacie Le Maïs", quartier: "PK 10", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24165090049", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.4036, lng: 9.5053 },
  { nom: "Pharmacie Dissang Dietou", quartier: "PK 11 (Melen)", ville: "Libreville", open: "08h00", close: "21h30", isGarde: false, tel: "+24111464554", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.3950, lng: 9.5150 },
  { nom: "Pharmacie de Bikélé", quartier: "PK 13 (Bikélé)", ville: "Libreville", open: "08h30", close: "21h00", isGarde: false, tel: "+24165190302", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3900, lng: 9.5500 },
  { nom: "Pharmacie de l'Espoir", quartier: "PK 10", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24177458921", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.4010, lng: 9.5105 },
  { nom: "Pharmacie de Plein Ciel", quartier: "Plein Ciel", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111740000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.3950, lng: 9.4750 },
  { nom: "Pharmacie de Lala", quartier: "Lala", ville: "Libreville", open: "08h00", close: "20h30", isGarde: false, tel: "+24111720000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.3880, lng: 9.4450 },
  { nom: "Pharmacie d'Akébé", quartier: "Akébé", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111710101", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3850, lng: 9.4530 },
  { nom: "Pharmacie d'Avea", quartier: "Avea", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111730000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.3910, lng: 9.4580 },
  { nom: "Pharmacie Belle Vue 2", quartier: "Belle Vue 2", ville: "Libreville", open: "08h00", close: "21h30", isGarde: false, tel: "+24111442020", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.4200, lng: 9.4600 },
  { nom: "Pharmacie de Mindoubé", quartier: "Mindoubé", ville: "Libreville", open: "08h00", close: "20h00", isGarde: false, tel: "+24166204050", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.3600, lng: 9.5000 },
  { nom: "Pharmacie d'Essassa", quartier: "Essassa", ville: "Ntoum", open: "08h00", close: "20h00", isGarde: false, tel: "+24174556677", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3500, lng: 9.6500 },
  { nom: "Pharmacie de Likouala", quartier: "Likouala", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111765050", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.4050, lng: 9.4480 },
  { nom: "Pharmacie du Carrefour GP", quartier: "Carrefour GP", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24162404040", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.3650, lng: 9.4950 },
  { nom: "Pharmacie Chantier Moderne", quartier: "Chantier Moderne", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24111700000", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3800, lng: 9.4800 },
  { nom: "Pharmacie d'Ozangué", quartier: "Ozangué", ville: "Libreville", open: "08h00", close: "21h30", isGarde: false, tel: "+24165303030", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.3920, lng: 9.4680 },
  { nom: "Pharmacie Delta", quartier: "Delta", ville: "Libreville", open: "08h00", close: "22h00", isGarde: false, tel: "+24111445566", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?q=80&w=1000", lat: 0.4400, lng: 9.4300 },
  { nom: "Pharmacie de Gigi", quartier: "Gigi", ville: "Libreville", open: "08h00", close: "21h00", isGarde: false, tel: "+24166000011", assurances: ["CNAMGS"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3750, lng: 9.4850 },
  { nom: "Pharmacie d'Avorbam", quartier: "Avorbam", ville: "Libreville", open: "08h00", close: "21h30", isGarde: false, tel: "+24166909090", assurances: ["CNAMGS", "ASCOMA"], image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=1000", lat: 0.4950, lng: 9.4320 },
  { nom: "Pharmacie de la Sablière", quartier: "La Sablière", ville: "Libreville", open: "08h30", close: "22h00", isGarde: false, tel: "+24111440022", assurances: ["CNAMGS", "AXA"], image: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?q=80&w=1000", lat: 0.4850, lng: 9.4150 },
  { nom: "Pharmacie d'Awendjé", quartier: "Awendjé", ville: "Libreville", open: "00h00", close: "23h59", isGarde: true, tel: "+24111704545", assurances: ["CNAMGS", "NSIA"], image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=1000", lat: 0.3800, lng: 9.4750 }
];

async function seedDB() {
  try {
    console.log("🚀 Création de la table pharmacies...");
    
    // On crée la table en s'assurant que les colonnes correspondent à vos données
    await pool.query(`
      DROP TABLE IF EXISTS pharmacies CASCADE;
      CREATE TABLE pharmacies (
        id SERIAL PRIMARY KEY,
        nom VARCHAR(255),
        quartier VARCHAR(255),
        ville VARCHAR(255),
        open_time VARCHAR(50),
        close_time VARCHAR(50),
        is_garde BOOLEAN,
        tel VARCHAR(50),
        image TEXT,
        lat DOUBLE PRECISION,
        lng DOUBLE PRECISION,
        assurances TEXT[]
      );
    `);
    console.log("✅ Table pharmacies créée avec succès !");

    console.log("💉 Insertion des données...");
    for (const p of pharmacies) {
      await pool.query(`
        INSERT INTO pharmacies (nom, quartier, ville, open_time, close_time, is_garde, tel, image, lat, lng, assurances)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      `, [p.nom, p.quartier, p.ville, p.open, p.close, p.isGarde, p.tel, p.image, p.lat, p.lng, p.assurances]);
    }

    console.log("🎉 Base de données remplie avec succès avec " + pharmacies.length + " pharmacies !");
  } catch (error) {
    console.error("❌ Erreur lors du remplissage:", error);
  } finally {
    pool.end(); // Ferme la connexion à la base de données
  }
}

seedDB();
