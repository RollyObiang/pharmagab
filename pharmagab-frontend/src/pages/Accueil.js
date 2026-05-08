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
const animatedTexts = [
  "Trouvez votre santé instantanément.", 
  "Les gardes de Libreville et à l'intérieur du pays.", 
  "PharmaGab, votre allié bien-être."
];

const popularPharmacies = [
  { id: 1, nom: "Pharmacie Sainte Marie", quartier: "Bd Triomphal", tel: "011740052", img: pharma },
  { id: 2, nom: "Grande Pharmacie des Forestiers", quartier: "Galerie Mbolo", tel: "011722352", img: named },
  { id: 3, nom: "Nouvelle Pharmacie d'Awondo", quartier: "Louis", tel: "011445707", img: gab },
];

function Accueil() {
  const [currentImage, setCurrentImage] = useState(0);
  const [currentText, setCurrentText] = useState(0);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [infoModal, setInfoModal] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const reassurances = {
    fiabilite: {
      title: "98% de Fiabilité Garantie",
      text: "Nos données de garde sont synchronisées quotidiennement avec l'Ordre National des Pharmaciens du Gabon.",
      icon: <CheckCircle color="#10b981" size={40} />
    },
    communaute: {
      title: "Une Communauté Engagée",
      text: "Rejoignez plus de 10 000 Gabonais qui utilisent PharmaGab pour s'entraider.",
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
        .check-list li { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 15px; color: #475569; font-size: 14px; }
        @media (max-width: 768px) {
          .april-container { flex-direction: column !important; }
          .april-right { border-top-left-radius: 0px !important; min-height: 200px !important; }
        }
      `}</style>

      {/* SECTION HÉROS CORRIGÉE */}
      <div style={{ ...styles.hero, backgroundImage: `url(${images[currentImage]})` }}>
        <div style={styles.heroOverlay}>
          <div className="container" style={{ width: '100%' }}>
            <Link to="/" style={styles.logoLink}>
              <div style={styles.logoContainer}>
                <UserRound size={35} color="#fbbf24" />
                <Pill size={18} color="white" style={styles.pillIcon} />
              </div>
            </Link>
            <h2 style={styles.animatedText}>{animatedTexts[currentText]}</h2>
            
            {/* CONTAINER BARRE DE RECHERCHE CENTRÉ */}
            <div style={styles.searchContainer}>
              <Search style={styles.searchIcon} size={20} color="#9ca3af" />
              <input type="text" placeholder="Rechercher une pharmacie..." style={styles.searchInput} />
            </div>
          </div>
        </div>
      </div>

      {/* SECTION PHARMACIES POPULAIRES */}
      <div className="container" style={{ marginTop: '30px' }}>
        <div style={styles.sectionHeader}><Star color="#fbbf24" fill="#fbbf24" size={18} /><h3 style={styles.sectionTitle}>Pharmacies Populaires</h3></div>
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
              <button className="btn-hover" style={styles.detailsBtn} onClick={(e) => { e.stopPropagation(); setSelectedPharmacy(p); }}>
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
            { img: cmgs, t: "CNAMGS", link: "https://www.cnamgs.ga/" }, 
            { img: saison, t: "Santé", link: "https://www.sante.gouv.ga/" }, 
            { img: phar, t: "Digital", link: "https://www.finances.gouv.ga/ministere/le-ministere/missions-et-organisation/le-numerique" } 
          ].map((item, idx) => (
            <div key={idx} className="hover-scale" style={styles.newsCard}>
              <div style={{ ...styles.newsThumb, backgroundImage: `url(${item.img})` }}></div>
              <div style={styles.newsContent}>
                <h4 style={styles.newsTitle}>{item.t} au Gabon...</h4>
                <button style={styles.newsLink} onClick={() => window.open(item.link, '_blank')}>
                  En savoir plus <ExternalLink size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION INNOVATION GABONAISE */}
      <div style={{ marginTop: '40px', padding: '0 20px' }}>
        <div className="container" style={styles.expertSection}>
          <div style={styles.expertTextContent}>
            <div style={styles.badge}>Innovation Gabonaise</div>
            <h2 style={{ fontSize: '24px', color: 'white', fontWeight: 'bold', margin: '15px 0' }}>Experts Pharma</h2>
            <p style={{ color: '#e2e8f0', fontSize: '13px' }}>Pharmaciens locaux engagés pour votre bien-être.</p>
          </div>
          <div style={{ ...styles.expertImg, backgroundImage: `url(${phar})`, filter: 'sepia(0.4) brightness(0.9)' }}></div>
        </div>
      </div>

      {/* SECTION TYPE "APRIL" */}
      <div className="container" style={{ marginTop: '40px', marginBottom: '40px' }}>
        <div className="hover-scale april-container" style={styles.aprilContainer}>
          <div style={styles.aprilLeft}>
            <div style={{ display: 'flex', gap: '4px', marginBottom: '10px' }}>
              {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="#fbbf24" color="#fbbf24" />)}
              <span style={{ fontSize: '14px', fontWeight: 'bold', marginLeft: '10px' }}>92% de clients satisfaits</span>
            </div>
            
            <h2 style={styles.aprilTitle}>Complémentaire santé <span style={{color: '#1e3a8a'}}>PHARMAGAB</span></h2>
            
            <ul className="check-list" style={{ listStyle: 'none', padding: 0 }}>
              <li><CheckCircle size={20} color="#3b82f6" /> <span><b>Application web</b> de garde en temps réel.</span></li>
              <li><CheckCircle size={20} color="#3b82f6" /> <span><b>Téléconsultation :</b> accès aux experts 7j/7.</span></li>
              <li><CheckCircle size={20} color="#3b82f6" /> <span><b>CNAMGS :</b> prise en charge facilitée.</span></li>
            </ul>

            <button className="btn-hover" style={styles.aprilBtn} onClick={() => window.open('https://wa.me/+24174001835', '_blank')}>
              Obtenir un tarif <ArrowRight size={18} />
            </button>
          </div>
          <div className="april-right" style={{ ...styles.aprilRight, backgroundImage: `url(${named})` }}></div>
        </div>
      </div>

      {/* POURQUOI S'ASSURER */}
      <div style={{ backgroundColor: '#f0f9ff', padding: '40px 20px', borderRadius: '30px', margin: '0 10px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold' }}>Pourquoi choisir PharmaGab ?</h2>
          <div style={styles.grid2}>
            <div className="hover-scale" style={styles.featureCardLight} onClick={() => setInfoModal(reassurances.fiabilite)}>
              <CheckCircle color="#10b981" size={24} />
              <h4 style={{ margin: '10px 0' }}>Fiabilité</h4>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Données certifiées</p>
            </div>
            <div className="hover-scale" style={styles.featureCardLight} onClick={() => setInfoModal(reassurances.communaute)}>
              <Users color="#3b82f6" size={24} />
              <h4 style={{ margin: '10px 0' }}>Communauté</h4>
              <p style={{ fontSize: '11px', color: '#64748b' }}>Entraide locale</p>
            </div>
          </div>
          <a href="https://wa.me/+24174001835" style={{textDecoration: 'none'}}>
            <button className="btn-hover" style={styles.primaryBtn}>Devis gratuit <ArrowRight size={18} /></button>
          </a>
        </div>
      </div>

      {/* MODAUX */}
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

      {selectedPharmacy && (
        <div className="modal-overlay" onClick={() => setSelectedPharmacy(null)}>
          <div style={styles.pharmacyModalBox} onClick={e => e.stopPropagation()}>
             <img src={selectedPharmacy.img} style={styles.modalFullImg} alt="pharmacie" />
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
  hero: { 
    height: '380px', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center', 
    borderBottomLeftRadius: '40px', 
    borderBottomRightRadius: '40px', 
    overflow: 'hidden' 
  },
  heroOverlay: { 
    height: '100%', 
    width: '100%', 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', // CENTRE LES ENFANTS HORIZONTALEMENT
    textAlign: 'center', 
    color: 'white' 
  },
  logoLink: { textDecoration: 'none', marginBottom: '15px' },
  logoContainer: { position: 'relative', width: '60px', margin: '0 auto' },
  pillIcon: { position: 'absolute', bottom: '0', right: '0', backgroundColor: '#10b981', borderRadius: '50%', padding: '2px' },
  animatedText: { 
    fontSize: '24px', 
    fontWeight: '800', 
    margin: '0 0 20px 0', 
    padding: '0 20px',
    maxWidth: '500px'
  },
  // --- BARRE DE RECHERCHE RÉPARÉE ---
  searchContainer: { 
    position: 'relative', 
    width: '90%', 
    maxWidth: '400px', 
    margin: '0 auto' 
  },
  searchIcon: { position: 'absolute', left: '15px', top: '13px', zIndex: 1 },
  searchInput: { 
    width: '100%', 
    padding: '14px 15px 14px 45px', 
    borderRadius: '20px', 
    border: 'none', 
    fontSize: '16px', // ANTI-ZOOM iOS
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    outline: 'none'
  },
  sectionHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' },
  sectionTitle: { margin: 0, fontSize: '20px', fontWeight: '700', color: '#1e293b' },
  popList: { display: 'flex', flexDirection: 'column', gap: '15px' },
  popCard: { backgroundColor: 'white', padding: '15px', borderRadius: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  cardContent: { display: 'flex', gap: '15px', alignItems: 'center' },
  cardImage: { width: '85px', height: '85px', borderRadius: '20px', objectFit: 'cover' },
  cardText: { flex: 1, textAlign: 'left' },
  popName: { margin: '0 0 5px 0', fontSize: '16px', fontWeight: '700' },
  popInfo: { fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '3px' },
  detailsBtn: { marginTop: '12px', width: '100%', border: 'none', background: '#009E60', color: 'white', borderRadius: '15px', padding: '12px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' },
  newsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  newsCard: { backgroundColor: 'white', borderRadius: '25px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  newsThumb: { height: '160px', backgroundSize: 'cover', backgroundPosition: 'center' },
  newsContent: { padding: '18px' },
  newsTitle: { margin: '8px 0', fontSize: '16px', fontWeight: '700', color: '#1e293b' },
  newsLink: { background: 'none', border: 'none', color: '#3b82f6', fontWeight: '700', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer' },
  grid2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' },
  featureCardLight: { backgroundColor: 'white', padding: '20px', borderRadius: '25px', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' },
  primaryBtn: { backgroundColor: '#1e3a8a', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '20px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '10px', margin: '0 auto', cursor: 'pointer' },
  expertSection: { backgroundColor: '#1e293b', borderRadius: '30px', padding: '25px', display: 'flex', gap: '20px', alignItems: 'center', justifyContent: 'space-between' },
  expertTextContent: { flex: 1, textAlign: 'left' },
  badge: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#fbbf24', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', display: 'inline-block' },
  expertImg: { width: '100px', height: '100px', borderRadius: '20px', backgroundSize: 'cover' },
  infoModalBox: { background: 'white', padding: '30px', borderRadius: '30px', maxWidth: '400px', width: '90%', textAlign: 'center', position: 'relative' },
  closeModalInfo: { position: 'absolute', top: '15px', right: '15px', border: 'none', background: 'none', cursor: 'pointer' },
  pharmacyModalBox: { background: 'white', borderRadius: '30px', maxWidth: '500px', width: '95%', overflow: 'hidden' },
  modalFullImg: { width: '100%', height: '220px', objectFit: 'cover' },
  aprilContainer: { backgroundColor: 'white', borderRadius: '30px', overflow: 'hidden', display: 'flex', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' },
  aprilLeft: { flex: 1, padding: '30px', minWidth: '280px', textAlign: 'left' },
  aprilRight: { flex: 1, minWidth: '280px', backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '250px', borderTopLeftRadius: '100px' },
  aprilTitle: { fontSize: '26px', fontWeight: '800', color: '#1e293b', marginBottom: '20px', lineHeight: '1.2' },
  aprilBtn: { backgroundColor: '#fbbf24', color: '#1e293b', border: 'none', padding: '14px 25px', borderRadius: '18px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }
};

export default Accueil;