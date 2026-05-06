import React, { useState, useEffect } from 'react';
import { Search, MapPin, Phone, Clock, ExternalLink, Navigation, CheckCircle2, X } from 'lucide-react';
import { pharmaciesLibreville } from '../data/pharmacies'; // Assure-toi que le chemin est correct

// 1. Fonction Haversine pour calculer la distance entre deux points GPS
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

const ToutesLesPharmacies = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPharmacies, setFilteredPharmacies] = useState(pharmaciesLibreville);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [userCoords, setUserCoords] = useState(null);

  // Logique du filtre de recherche textuelle
  useEffect(() => {
    const results = pharmaciesLibreville.filter(pharma =>
      pharma.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pharma.quartier.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPharmacies(results);
  }, [searchTerm]);

  // 2. Logique du bouton GPS
  const handleGPSClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserCoords({ lat: latitude, lng: longitude });

          const pharmaciesAvecDistance = pharmaciesLibreville.map(pharma => ({
            ...pharma,
            distanceCalculée: calculateDistance(latitude, longitude, pharma.lat, pharma.lng)
          }));

          // Tri de la plus proche à la plus lointaine
          const triees = pharmaciesAvecDistance.sort((a, b) => a.distanceCalculée - b.distanceCalculée);
          
          setFilteredPharmacies(triees);
          alert("Localisation activée ! Les pharmacies les plus proches s'affichent en tête.");
        },
        () => {
          alert("Erreur : Impossible d'accéder à votre position. Vérifiez vos paramètres GPS.");
        }
      );
    } else {
      alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Trouver une pharmacie</h2>

      {/* Barre de recherche */}
      <div style={styles.searchWrapper}>
        <div style={styles.searchBar}>
          <Search size={20} color="#666" />
          <input
            type="text"
            placeholder="Nom ou quartier..."
            style={styles.input}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button style={styles.gpsButton} onClick={handleGPSClick} title="Pharmacies proches">
          <Navigation size={24} color="white" />
        </button>
      </div>

      {/* Liste des pharmacies */}
      <div style={styles.list}>
        {filteredPharmacies.map((pharma) => (
          <div key={pharma.id} style={styles.card}>
            <img 
              src={pharma.image} 
              alt={`Photo de la ${pharma.nom}`} 
              style={styles.cardImg} 
            />
            <div style={styles.cardContent}>
              <h3 style={styles.pharmaName}>{pharma.nom}</h3>
              <p style={styles.pharmaInfo}><MapPin size={14} /> {pharma.quartier}</p>
              
              {/* Affichage de la distance dynamique si le GPS est activé */}
              <div style={styles.distanceTag}>
                {pharma.distanceCalculée 
                  ? `${pharma.distanceCalculée.toFixed(1)} KM` 
                  : pharma.distance}
              </div>

              <button 
                style={styles.detailsBtn}
                onClick={() => setSelectedPharmacy(pharma)}
              >
                Détails
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Détails */}
      {selectedPharmacy && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <button style={styles.closeBtn} onClick={() => setSelectedPharmacy(null)}>
              <X size={24} />
            </button>
            
            {/* Correction de la balise image demandée */}
            <img 
              src={selectedPharmacy.image} 
              alt={`Détail de la ${selectedPharmacy.nom}`} 
              style={styles.modalBigImage} 
            />

            <div style={{ padding: '20px' }}>
              <h2>{selectedPharmacy.nom}</h2>
              <p><Phone size={18} /> {selectedPharmacy.telephone}</p>
              <p><Clock size={18} /> {selectedPharmacy.horaires}</p>
              <div style={styles.tagContainer}>
                {selectedPharmacy.services.map((s, i) => (
                  <span key={i} style={styles.serviceTag}><CheckCircle2 size={12} /> {s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles rapides (à adapter selon ton CSS actuel)
const styles = {
  container: { padding: '20px', maxWidth: '800px', margin: '0 auto' },
  title: { fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' },
  searchWrapper: { display: 'flex', gap: '10px', marginBottom: '30px' },
  searchBar: { 
    flex: 1, display: 'flex', alignItems: 'center', 
    backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '12px' 
  },
  input: { border: 'none', background: 'none', marginLeft: '10px', outline: 'none', width: '100%' },
  gpsButton: { 
    backgroundColor: '#008751', border: 'none', borderRadius: '12px', 
    padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' 
  },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { display: 'flex', border: '1px solid #eee', borderRadius: '15px', overflow: 'hidden', backgroundColor: 'white' },
  cardImg: { width: '100px', height: '100px', objectFit: 'cover' },
  cardContent: { padding: '10px', flex: 1, position: 'relative' },
  pharmaName: { margin: 0, fontSize: '16px' },
  pharmaInfo: { color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '5px' },
  distanceTag: { 
    backgroundColor: '#e8f5e9', color: '#008751', padding: '2px 8px', 
    borderRadius: '20px', fontSize: '12px', width: 'fit-content', marginTop: '5px' 
  },
  detailsBtn: { position: 'absolute', right: '10px', bottom: '10px', color: '#0066cc', border: 'none', background: 'none', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modal: { backgroundColor: 'white', borderRadius: '20px', width: '90%', maxWidth: '500px', overflow: 'hidden', position: 'relative' },
  modalBigImage: { width: '100%', height: '200px', objectFit: 'cover' },
  closeBtn: { position: 'absolute', top: '10px', right: '10px', background: 'white', borderRadius: '50%', border: 'none', padding: '5px', cursor: 'pointer', zIndex: 10 },
  tagContainer: { display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' },
  serviceTag: { backgroundColor: '#f0f0f0', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }
};

export default ToutesLesPharmacies;