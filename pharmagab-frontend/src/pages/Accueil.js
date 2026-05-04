import React, { useState, useEffect } from 'react';
import { 
  Search, Star, MapPin, X, UserRound, Pill, ShieldCheck, 
  Phone, ExternalLink, ChevronDown, Award, 
  Smartphone, Users, Lightbulb, Clock, CheckCircle, ArrowRight, MessageSquare, Info
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Importations
import gab from '../assets/gab.png';
import named from '../assets/named.jpg';
import pharma from '../assets/pharma.jpg';
import acae from '../assets/Pharmacie-dAcae.jpg';
import cmgs from '../assets/cmgs.png';
import saison from '../assets/saison.png';
import phar from '../assets/phar.jpg';

const images = [pharma, named, acae, gab];
const animatedTexts = ["Trouvez votre santé instantanément.", "Les gardes de Libreville à Port-Gentil.", "PharmaGab, votre allié bien-être."];

const popularPharmacies = [
  { id: 1, nom: "Pharmacie Sainte Marie", quartier: "Bd Triomphal", tel: "011740052", img: pharma },
  { id: 2, nom: "Grande Pharmacie des Forestiers", quartier: "Galerie Mbolo", tel: "011722352", img: named },
  { id: 3, nom: "Nouvelle Pharmacie d'Awondo", quartier: "Louis", tel: "011445707", img: gab },
];

function Accueil() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [infoModal, setInfoModal] = useState(null); // Pour Fiabilité / Communauté

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Données pour le modal de réassurance
  const reassurances = {
    fiabilite: {
      title: "98% de Fiabilité Garantie",
      text: "Nos données de garde sont synchronisées quotidiennement avec l'Ordre National des Pharmaciens du Gabon. Vous évitez ainsi les déplacements inutiles nocturnes.",
      icon: <CheckCircle color="#10b981" size={40} />
    },
    communaute: {
      title: "Une Communauté Engagée",
      text: "Rejoignez plus de 10 000 Gabonais qui utilisent PharmaGab pour signaler les ruptures de stocks et aider les autres patients à trouver leurs médicaments.",
      icon: <Users color="#3b82f6" size={40} />
    }
  };

  return (
    <div className="animate-fade" style={{ backgroundColor: '#f8fafc' }}>
      
      <style>{`
        .hover-scale { transition: all 0.3s ease; cursor: pointer; }
        .hover-scale:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important; }
        .btn-hover:hover { filter: brightness(1.1); transform: scale(1.05); transition: 0.2s; }
        .modal-overlay { position: fixed; top:0; left:0; right:0; bottom:0; background: rgba(0,0,0,0.7); z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px; }
      `}</style>

      {/* SECTION HÉROS */}
      <div style={{ ...styles.hero, backgroundImage: `url(${images[currentImage]})` }}>
        <div style={styles.heroOverlay}>
          <div className="container">
            <Link to="/" style={styles.logoLink}><div style={styles.logoContainer}><UserRound size={35} color="var(--gab-yellow)" /><Pill size={18} color="white" style={styles.pillIcon} /></div></Link>
            <h2 style={styles.animatedText}>{animatedTexts[currentText]}</h2>
            <div style={styles.searchContainer}>
              <Search style={styles.searchIcon} size={20} color="#9ca3af" />
              <input type="text" placeholder="Rechercher une pharmacie..." style={styles.searchInput} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PHARMACIES POPULAIRES (FIXED CLIC) */}
      <div className="container" style={{ marginTop: '30px' }}>
        <div style={styles.sectionHeader}><Star color="var(--gab-yellow)" fill="var(--gab-yellow)" size={18} /><h3 style={styles.sectionTitle}>Pharmacies Populaires</h3></div>
        <div style={styles.popList}>
          {popularPharmacies.map((p) => (
            <div key={p.id} className="hover-scale" style={styles.popCard}>
              <div style={styles.cardContent}>
                <img src={p.img} alt={p.nom} style={styles.cardImage} />
                <div style={styles.cardText}>
                  <h4 style={styles.popName}>{p.nom}</h4>
                  <div style={styles.popInfo}><MapPin size={12} /> {p.quartier}</div>
                  <div style={styles.popInfo}><Phone size={12} /> {p.tel}</div>
                </div>
              </div>
              {/* Le bouton a maintenant sa propre fonction onClick isolée */}
              <button 
                className="btn-hover" 
                style={styles.detailsBtn} 
                onClick={(e) => { e.stopPropagation(); setSelectedPharmacy(p); }}
              >
                Détails
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ACTUALITÉS */}
<div className="container" style={{ marginTop: '40px' }}>
  <h3 style={styles.sectionTitle}>Actualités & Conseils</h3>
  <div style={styles.newsGrid}>
    {[ 
      { 
        img: cmgs, 
        t: "CNAMGS", 
        link: "https://www.cnamgs.ga/" // Lien officiel
      }, 
      { 
        img: saison, 
        t: "Santé", 
        link: "https://www.sante.gouv.ga/" // Ministère de la santé
      }, 
      { 
        img: phar, 
        t: "Digital", 
        link: "https://www.finances.gouv.ga/ministere/le-ministere/missions-et-organisation/le-numerique" // Exemple Digital
      } 
    ].map((item, idx) => (
      <div key={idx} className="hover-scale" style={styles.newsCard}>
        <div style={{ ...styles.newsThumb, backgroundImage: `url(${item.img})` }}></div>
        <div style={styles.newsContent}>
          <h4 style={styles.newsTitle}>{item.t} au Gabon...</h4>
          {/* Modification ici : ajout du onClick pour ouvrir le lien */}
          <button 
            style={styles.newsLink} 
            onClick={() => window.open(item.link, '_blank')}
          >
            En savoir plus <ExternalLink size={14} />
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

      {/* --- POURQUOI S'ASSURER (MODAL ADDED) --- */}
      <div style={{ marginTop: '50px', backgroundColor: '#f0f9ff', padding: '40px 20px', borderRadius: '30px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold' }}>Pourquoi s'assurer avec PharmaGab ?</h2>
          <div style={styles.grid2}>
            <div className="hover-scale" style={styles.featureCardLight} onClick={() => setInfoModal(reassurances.fiabilite)}>
              <CheckCircle color="#10b981" size={24} />
              <h4 style={{ margin: '10px 0' }}>Fiabilité</h4>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Cliquez pour voir les détails</p>
            </div>
            <div className="hover-scale" style={styles.featureCardLight} onClick={() => setInfoModal(reassurances.communaute)}>
              <Users color="#3b82f6" size={24} />
              <h4 style={{ margin: '10px 0' }}>Communauté</h4>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Cliquez pour voir les détails</p>
            </div>
          </div>
          {/* Redirection vers WhatsApp ou Contact */}
          <a href="https://wa.me/24174001835" style={{textDecoration: 'none'}}>
            <button className="btn-hover" style={styles.primaryBtn}>Obtenir mon devis gratuit <ArrowRight size={18} /></button>
          </a>
        </div>
      </div>

      {/* SECTION EXPERTS */}
      <div style={{ marginTop: '40px', padding: '20px' }}>
        <div className="container" style={styles.expertSection}>
          <div style={styles.expertTextContent}>
            <div style={styles.badge}>Innovation Gabonaise</div>
            <h2 style={{ fontSize: '24px', color: 'white', fontWeight: 'bold', margin: '15px 0' }}>Experts Pharma</h2>
            <p style={{ color: '#e2e8f0', fontSize: '13px' }}>Pharmaciens locaux engagés pour votre bien-être.</p>
          </div>
          <div style={{ ...styles.expertImg, backgroundImage: `url(${phar})`, filter: 'sepia(0.4) brightness(0.9)' }}></div>
        </div>
      </div>

      {/* --- MODAL INFO (Fiabilité/Communauté) --- */}
      {infoModal && (
        <div className="modal-overlay" onClick={() => setInfoModal(null)}>
          <div style={styles.infoModalBox} onClick={e => e.stopPropagation()}>
            <button style={styles.closeModalInfo} onClick={() => setInfoModal(null)}><X /></button>
            {infoModal.icon}
            <h3 style={{margin: '15px 0'}}>{infoModal.title}</h3>
            <p style={{lineHeight: '1.6', color: '#475569'}}>{infoModal.text}</p>
            <button style={styles.detailsBtn} onClick={() => setInfoModal(null)}>J'ai compris</button>
          </div>
        </div>
      )}

      {/* MODAL PHARMACIE */}
      {selectedPharmacy && (
        <div className="modal-overlay" onClick={() => setSelectedPharmacy(null)}>
          <div style={styles.pharmacyModalBox} onClick={e => e.stopPropagation()}>
             <img src={selectedPharmacy.img} style={styles.modalFullImg} />
             <div style={{padding: '20px'}}>
                <h3>{selectedPharmacy.nom}</h3>
                <p><MapPin size={16}/> {selectedPharmacy.quartier}</p>
                <button style={styles.primaryBtn} onClick={() => setSelectedPharmacy(null)}>Fermer</button>
             </div>
          </div>
        </div>
      )}

      <div style={{ height: '80px' }}></div>
    </div>
  );
}

const styles = {
  hero: { height: '350px', backgroundSize: 'cover', backgroundPosition: 'center', borderBottomLeftRadius: '30px', borderBottomRightRadius: '30px', overflow: 'hidden' },
  heroOverlay: { height: '100%', width: '100%', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', color: 'white' },
  logoLink: { textDecoration: 'none', display: 'inline-block', marginBottom: '15px' },
  logoContainer: { position: 'relative', width: '60px', margin: '0 auto' },
  pillIcon: { position: 'absolute', bottom: '0', right: '0', backgroundColor: '#10b981', borderRadius: '50%', padding: '2px' },
  animatedText: { fontSize: '22px', fontWeight: '800', margin: '0 0 10px 0', padding: '0 20px' },
  searchContainer: { position: 'relative', maxWidth: '320px', margin: '0 auto' },
  searchIcon: { position: 'absolute', left: '15px', top: '12px' },
  searchInput: { width: '100%', padding: '12px 15px 12px 45px', borderRadius: '15px', border: 'none', fontSize: '14px' },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' },
  sectionTitle: { margin: 0, fontSize: '18px', fontWeight: '700', color: '#1e293b' },
  popList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  popCard: { backgroundColor: 'white', padding: '12px', borderRadius: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  cardContent: { display: 'flex', gap: '15px', alignItems: 'center' },
  cardImage: { width: '80px', height: '80px', borderRadius: '15px', objectFit: 'cover' },
  cardText: { flex: 1 },
  popName: { margin: '0 0 5px 0', fontSize: '15px', fontWeight: '700' },
  popInfo: { fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' },
  detailsBtn: { marginTop: '10px', width: '100%', border: 'none', background: '#10b981', color: 'white', borderRadius: '10px', padding: '10px', fontSize: '12px', fontWeight: '700' },
  newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  newsCard: { backgroundColor: 'white', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
  newsThumb: { height: '150px', backgroundSize: 'cover', backgroundPosition: 'center' },
  newsContent: { padding: '15px' },
  newsTitle: { margin: '8px 0', fontSize: '15px', fontWeight: '700', color: '#1e293b' },
  newsLink: { background: 'none', border: 'none', color: '#3b82f6', fontWeight: '700', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', padding: 0 },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' },
  featureCardLight: { backgroundColor: 'white', padding: '20px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  primaryBtn: { backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '15px 30px', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', cursor: 'pointer' },
  expertSection: { backgroundColor: '#1e293b', borderRadius: '30px', padding: '30px', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' },
  expertTextContent: { flex: 1 },
  badge: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fbbf24', padding: '5px 12px', borderRadius: '20px', fontSize: '10px', display: 'inline-block' },
  expertImg: { width: '120px', height: '120px', borderRadius: '20px', backgroundSize: 'cover' },
  infoModalBox: { background: 'white', padding: '30px', borderRadius: '30px', maxWidth: '400px', width: '100%', textAlign: 'center', position: 'relative' },
  closeModalInfo: { position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer' },
  pharmacyModalBox: { background: 'white', borderRadius: '30px', maxWidth: '500px', width: '100%', overflow: 'hidden' },
  modalFullImg: { width: '100%', height: '200px', objectFit: 'cover' }
};

export default Accueil;