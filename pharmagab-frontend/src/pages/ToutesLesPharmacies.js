import React, { useState, useEffect } from 'react';
import { MapPin, Clock3, Phone, Navigation, ShieldCheck, X, Star, Search, Map as MapIcon, LocateFixed, CheckCircle2, BellRing } from 'lucide-react';

function ToutesLesPharmacies() {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [showSubscriptionSuccess, setShowSubscriptionSuccess] = useState(false);
  const [gpsStatus, setGpsStatus] = useState({ show: false, type: '', message: '' }); // Nouvel état pour l'alerte pro

  // Charger toutes les pharmacies au démarrage depuis le Backend
  useEffect(() => {
    fetchPharmacies();
  }, []);

  const fetchPharmacies = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/pharmacies');
      const data = await response.json();
      
      const formattedData = data.map(p => ({
        ...p,
        isGarde: p.is_garde,
        // Si on n'a pas la distance GPS, on simule une distance pour l'affichage par défaut (ou on affiche "-" )
        km: p.distance ? parseFloat(p.distance).toFixed(1) : (Math.random() * 5 + 1).toFixed(1)
      }));
      setPharmacies(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des pharmacies:", error);
      setLoading(false);
    }
  };

  // 1. Fonction pour obtenir la position GPS réelle et appeler l'API de proximité
  const getNearbyPharmacies = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setUserLocation({ lat, lng });
        
        try {
          setLoading(true);
          // On appelle notre nouvelle super route backend de proximité !
          const response = await fetch(`http://localhost:5000/api/pharmacies/proximite?lat=${lat}&lng=${lng}`);
          const data = await response.json();
          
          const formattedData = data.map(p => ({
            ...p,
            isGarde: p.is_garde,
            km: parseFloat(p.distance).toFixed(1) // La vraie distance calculée par PostgreSQL !
          }));
          setPharmacies(formattedData);
          setLoading(false);
          
          // ALERTE PRO AU LIEU DE alert()
          setGpsStatus({ show: true, type: 'success', message: "Localisation activée ! Les pharmacies les plus proches s'affichent en tête." });
          setTimeout(() => setGpsStatus({ show: false, type: '', message: '' }), 3500);

        } catch (error) {
          console.error("Erreur lors du calcul de proximité:", error);
          setLoading(false);
        }

      }, () => {
        // ALERTE PRO AU LIEU DE alert()
        setGpsStatus({ show: true, type: 'error', message: "Impossible d'accéder à votre position. Vérifiez vos paramètres." });
        setTimeout(() => setGpsStatus({ show: false, type: '', message: '' }), 3500);
      });
    }
  };

  const handleSubscribe = (pharmaName) => {
    setShowSubscriptionSuccess(true);
    setTimeout(() => {
      setShowSubscriptionSuccess(false);
    }, 3000);
  };

  const filteredPharmacies = pharmacies.filter(p => 
    p.nom?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.quartier?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openItinerary = (pharma) => {
    const destination = encodeURIComponent(`${pharma.nom}, ${pharma.quartier}, Libreville`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${destination}`, '_blank');
  };

  return (
    <div className="animate-fade">
      {/* MESSAGE GPS (OVERLAY PRO) */}
      {gpsStatus.show && (
        <div style={styles.successOverlay} className="animate-slide-up">
          <div style={styles.successCard}>
            <div style={{ ...styles.bellIconBox, backgroundColor: gpsStatus.type === 'success' ? '#dcfce7' : '#fee2e2' }}>
               {gpsStatus.type === 'success' ? <LocateFixed size={40} color="var(--gab-green)" /> : <X size={40} color="#ef4444" />}
            </div>
            <h3 style={styles.successTitle}>{gpsStatus.type === 'success' ? 'Position trouvée !' : 'Erreur GPS'}</h3>
            <p style={styles.successSub}>{gpsStatus.message}</p>
          </div>
        </div>
      )}

      {/* MESSAGE DE SUCCÈS ABONNEMENT (OVERLAY) */}
      {showSubscriptionSuccess && (
        <div style={styles.successOverlay} className="animate-slide-up">
          <div style={styles.successCard}>
            <div style={styles.bellIconBox}>
               <BellRing size={40} color="var(--gab-blue)" />
            </div>
            <h3 style={styles.successTitle}>Abonnement activé !</h3>
            <p style={styles.successSub}>
              Vous recevrez désormais les gardes et les promos de <strong>{selectedPharmacy?.nom}</strong>.
            </p>
            <button onClick={() => setShowSubscriptionSuccess(false)} style={styles.okBtn}>Génial !</button>
          </div>
        </div>
      )}

      <div className="container">
        <h2 style={styles.pageTitle}>Trouver une pharmacie</h2>

        {/* BARRE DE RECHERCHE + BOUTON GPS */}
        <div style={styles.searchRow}>
          <div style={styles.searchContainer}>
            <Search size={18} color="#9ca3af" />
            <input 
              type="text" 
              placeholder="Nom ou quartier..." 
              style={styles.searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button onClick={getNearbyPharmacies} style={styles.gpsBtn}>
            <LocateFixed size={20} />
          </button>
        </div>
        
        {/* LISTE DYNAMIQUE */}
        <div style={styles.list}>
          {filteredPharmacies.map((p) => (
            <div key={p.id} className="pharmacy-card-styled" style={styles.card}>
              <div style={styles.cardContent}>
                <img src={p.image} alt={p.nom} style={styles.cardImage} />
                <div style={styles.cardInfo}>
                  {p.isGarde && <span className="badge badge-garde" style={{marginBottom: '5px', display:'inline-block'}}>De Garde</span>}
                  <h3 style={styles.cardName}>{p.nom}</h3>
                  <div style={styles.infoLine}><MapPin size={12} /> <span>{p.quartier}</span></div>
                  
                  <div style={styles.cardFooter}>
                    <span className="badge badge-open">{p.km} km</span>
                    <button onClick={() => setSelectedPharmacy(p)} className="text-link" style={styles.detailsBtn}>Détails</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE DÉTAILS */}
      {selectedPharmacy && (
        <div className="modal-overlay animate-slide-up" style={styles.modal}>
          <div style={styles.modalHeader}>
            <button onClick={() => setSelectedPharmacy(null)} style={styles.closeBtn}><X size={24} /></button>
            <h3 style={styles.modalHeaderTitle}>{selectedPharmacy.nom}</h3>
          </div>

          <img src={selectedPharmacy.image} alt="Détail" style={styles.modalBigImage} />

          <div className="container" style={styles.modalBody}>
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedPharmacy.nom + " " + selectedPharmacy.quartier)}`}
              target="_blank" 
              rel="noreferrer"
              style={styles.mapPreview}
            >
              <MapIcon size={20} /> Voir sur la carte interactive
            </a>

            <div style={styles.actionGrid}>
              <a href={`tel:${selectedPharmacy.tel}`} style={styles.actionCardLink}>
                <div style={{ ...styles.actionIcon, backgroundColor: '#dbeafe', color: '#1e40af' }}><Phone /></div>
                <span>Appeler</span>
              </a>
              <button onClick={() => openItinerary(selectedPharmacy)} style={styles.actionCardBtn}>
                <div style={{ ...styles.actionIcon, backgroundColor: '#fef9c3', color: '#854d0e' }}><Navigation /></div>
                <span>Itinéraire</span>
              </button>
              <button onClick={() => handleSubscribe(selectedPharmacy.nom)} style={styles.actionCardBtn}>
                <div style={{ ...styles.actionIcon, backgroundColor: '#dcfce7', color: '#166534' }}><Star size={24} /></div>
                <span>S'abonner</span>
              </button>
            </div>

            <div style={styles.insurances}>
              <h4 style={styles.sectionSubtitle}>Assurances acceptées</h4>
              <ul style={styles.insuranceList}>
                {selectedPharmacy.assurances.map(ins => (
                  <li key={ins} style={styles.insuranceItem}><ShieldCheck size={16} color="var(--gab-green)" /> {ins}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  // AJOUTS DES STYLES DE SUCCÈS PRO
  successOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  successCard: { backgroundColor: 'white', padding: '30px', borderRadius: '25px', textAlign: 'center', width: '100%', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
  bellIconBox: { width: '80px', height: '80px', backgroundColor: '#eff6ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' },
  successTitle: { fontSize: '20px', fontWeight: '800', margin: 0, color: '#1e293b' },
  successSub: { fontSize: '14px', color: '#64748b', lineHeight: '1.5' },
  okBtn: { backgroundColor: 'var(--gab-blue)', color: 'white', border: 'none', padding: '10px 30px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', marginTop: '5px' },

  // Styles existants
  searchRow: { display: 'flex', gap: '10px', marginBottom: '20px', padding: '0 5px' },
  searchContainer: { flex: 1, display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#f3f4f6', padding: '12px 15px', borderRadius: '15px' },
  searchInput: { border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '14px' },
  gpsBtn: { backgroundColor: 'var(--gab-green)', color: 'white', border: 'none', borderRadius: '15px', width: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
  mapPreview: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#e0f2fe', color: '#0369a1', padding: '12px', borderRadius: '12px', marginBottom: '20px', textDecoration: 'none', fontWeight: '700', fontSize: '14px' },
  actionCardLink: { textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontSize: '11px', fontWeight: '600' },
  actionCardBtn: { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-dark)', fontSize: '11px', fontWeight: '600' },
  pageTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '20px', paddingLeft: '5px' },
  list: { display: 'flex', flexDirection: 'column', gap: '15px' },
  card: { backgroundColor: 'white', borderRadius: '20px', padding: '15px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', borderLeft: '5px solid var(--gab-blue)' },
  cardContent: { display: 'flex', gap: '15px', alignItems: 'center' },
  cardImage: { width: '80px', height: '80px', borderRadius: '15px', objectFit: 'cover' },
  cardInfo: { flex: 1 },
  cardName: { margin: '0 0 5px 0', fontSize: '16px', fontWeight: '700' },
  infoLine: { display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: '#6b7280' },
  cardFooter: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' },
  detailsBtn: { border: 'none', background: 'none', color: 'var(--gab-blue)', fontWeight: 'bold', cursor: 'pointer' },
  modal: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'white', zIndex: 1100, overflowY: 'auto' },
  modalHeader: { display: 'flex', alignItems: 'center', padding: '15px 20px', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 },
  closeBtn: { border: 'none', background: 'none', cursor: 'pointer' },
  modalHeaderTitle: { margin: 0, fontSize: '18px', fontWeight: '700' },
  modalBigImage: { width: '100%', height: '220px', objectFit: 'cover' },
  modalBody: { marginTop: '-20px', backgroundColor: 'white', borderTopLeftRadius: '25px', borderTopRightRadius: '25px', padding: '25px' },
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginBottom: '25px' },
  actionIcon: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%' },
  sectionSubtitle: { margin: '0 0 10px 0', fontSize: '16px', fontWeight: '700' },
  insuranceList: { display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0 },
  insuranceItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' },
};

export default ToutesLesPharmacies;