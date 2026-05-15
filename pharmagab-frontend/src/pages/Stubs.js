import React, { useState, useEffect } from 'react';
import {
  Mail, Phone, MessageCircle, HelpCircle,
  ExternalLink, Globe, ShieldCheck, Send, User, MessageSquare,
  Plus, Minus, Target, Award, Shield, Activity // Ajout des icônes pour l'accordéon
} from 'lucide-react';

// Importation des images
import faqImg from '../assets/faq.jpg';
import callImg from '../assets/call.jpg';
import pharmaImg from '../assets/saison.png';
import acae from '../assets/cmgs.png';
import named from '../assets/gital.jpg';


// --- COMPOSANT REUTILISABLE PAGEWRAPPER ---
const PageWrapper = ({ title, subtitle, children, image }) => (
  <div className="animate-fade" style={{ padding: '20px', paddingBottom: '100px' }}>
    {image && (
      <div style={styles.heroImageContainer}>
        <img src={image} alt={title} style={styles.heroImage} className="hover-zoom" />
      </div>
    )}
    <div style={{ marginBottom: '30px', marginTop: '10px' }}>
      <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-dark)', margin: '0' }}>{title}</h2>
      <p style={{ color: 'var(--text-gray)', fontSize: '14px', margin: '5px 0 0 0' }}>{subtitle}</p>
    </div>
    {children}
  </div>
);

// --- PAGE À PROPOS ---
export const APropos = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  // État pour gérer l'ouverture de l'accordéon
  const [openSection, setOpenSection] = useState(null);

  const slides = [
    { img: pharmaImg, text: "Un réseau de plus de 200 pharmacies à travers le Gabon." },
    { img: acae, text: "Une mise à jour en temps réel des pharmacies de garde." },
    { img: named, text: "Votre santé accessible 24h/24 et 7j/7." }
  ];

  const testimonials = [
    { name: "OBAME J.", role: "Libreville", text: "PharmaGab m'a sauvé la vie une nuit de dimanche !" },
    { name: "MOUSSAVOU S.", role: "Port-Gentil", text: "Très simple à utiliser, les numéros sont toujours à jour." },
    { name: "KASSA M.", role: "Franceville", text: "Enfin une solution moderne pour nos pharmacies au Gabon." }
  ];

  // Données de l'accordéon (style OPN)
  const accordionSections = [
    {
      id: 'vision',
      title: 'Vision',
      icon: <Target size={18} color="var(--gab-green)" />,
      content: "Mettre fin aux manques de médicaments et autres produits de santé essentiels dans toutes les formations sanitaires du Gabon d'ici à 2030."
    },
    {
      id: 'ambition',
      title: 'Ambition',
      icon: <Award size={18} color="var(--gab-green)" />,
      content: "Se hisser aux standards des meilleures centrales d'achat africaines, et faire de PharmaGab un véritable pôle d'excellence en santé."
    },
    {
      id: 'mission',
      title: 'Mission Principale',
      icon: <Shield size={18} color="var(--gab-green)" />,
      content: "Assurer l'accessibilité des médicaments de qualité sur toute l'étendue du territoire national, à moindre coût pour les populations gabonaises."
    },
    {
      id: 'objectif',
      title: 'Objectifs Stratégiques',
      icon: <Award size={18} color="var(--gab-green)" />,
      content: "Rendre l'Application Web disponible et accessible dans tout l'étandus du térritoire national en contribuant au développement d'une chaine d'approvisionnement nationale  ."
    }

  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <PageWrapper title="À propos" subtitle="Digitaliser la santé au Gabon">
      <div style={styles.carouselContainer}>
        <img src={slides[activeSlide].img} alt="Pharma" style={styles.carouselImg} />
        <div style={styles.carouselOverlay}>
          <p style={styles.carouselText}>{slides[activeSlide].text}</p>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginTop: 0, color: 'var(--gab-green)' }}>Qui sommes-nous ?</h3>
        <p style={styles.text}>
          <b>PharmaGab</b> est née d'un constat simple : il est trop difficile de trouver une pharmacie ouverte en cas d'urgence la nuit ou les jours fériés au Gabon.
          <br /><br />
          Nous travaillons en étroite collaboration avec les syndicats de pharmaciens pour offrir une information fiable et géolocalisée. Notre vision est de devenir le hub de santé numérique de référence en Afrique Centrale.
        </p>

        <div style={styles.statsGrid}>
          <a href="https://www.union.sonapresse.com" target="_blank" rel="noreferrer" style={styles.statItem}>
            <Globe size={24} color="var(--gab-blue)" />
            <span style={styles.statLabel}>Actualités Médicales</span>
          </a>
          <div style={styles.statItem}>
            <ShieldCheck size={24} color="var(--gab-green)" />
            <span style={styles.statLabel}>Partenaires Officiels</span>
          </div>
        </div>
      </div>

      {/* --- NOUVELLE SECTION ACCORDÉON (STYLE VIDÉO) --- */}
      <div style={{ marginTop: '25px', backgroundColor: 'white', borderRadius: '24px', padding: '10px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
        {accordionSections.map((section) => (
          <div key={section.id} style={{ borderBottom: section.id !== 'mission' ? '1px solid #eee' : 'none' }}>
            <button
              onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
              style={styles.accordionHeader}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {section.icon}
                <span style={{ fontWeight: '700', fontSize: '15px', color: 'var(--text-dark)' }}>{section.title}</span>
              </div>
              {openSection === section.id ? <Minus size={18} /> : <Plus size={18} />}
            </button>
            {openSection === section.id && (
              <div style={{ padding: '0 15px 15px 45px', fontSize: '14px', color: '#4b5563', lineHeight: '1.5' }}>
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px' }}>
        <h4 style={styles.sectionTitle}>Témoignages utilisateurs</h4>
        <div style={styles.testimonialWrapper}>
          <div style={styles.testimonialScroll}>
            {testimonials.map((t, i) => (
              <div key={i} style={styles.testimonialCard} className="hover-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <div style={styles.avatar}><User size={16} color="white" /></div>
                  <div>
                    <div style={{ fontWeight: '700', fontSize: '14px' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-gray)' }}>{t.role}</div>
                  </div>
                </div>
                <p style={{ fontSize: '13px', fontStyle: 'italic', margin: 0 }}>"{t.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

// ... LE RESTE DU FICHIER (Contact, FAQ et Styles) RESTE IDENTIQUE ...

// --- PAGE CONTACT ---
export const Contact = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const targetEmail = "infospharmagab@gmail.com";
    const subject = encodeURIComponent(`Message PharmaGab de ${formData.nom}`);
    const body = encodeURIComponent(
      `Nom: ${formData.nom}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${targetEmail}?subject=${subject}&body=${body}`;
  };

  const handleWhatsApp = () => {
    const phone = "24174001835";
    const text = encodeURIComponent("Bonjour PharmaGab, j'aimerais avoir des renseignements.");
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <PageWrapper title="Contact" subtitle="Une question ? Écrivez-nous !" image={callImg}>
      <div style={styles.contactContainer}>
        <div style={styles.contactSidebar}>
          <a href="mailto:infospharmagab@gmail.com" style={styles.contactItem} className="hover-card">
            <div style={{ ...styles.iconCircle, backgroundColor: '#dbeafe' }}><Mail color="#1e40af" size={20} /></div>
            <div>
              <span style={styles.contactLabel}>Email</span>
              <div style={styles.contactValue}>infospharmagab@gmail.com</div>
            </div>
          </a>

          <a href="tel:+24174001835" style={styles.contactItem} className="hover-card">
            <div style={{ ...styles.iconCircle, backgroundColor: '#fef9c3' }}><Phone color="#854d0e" size={20} /></div>
            <div>
              <span style={styles.contactLabel}>Téléphone</span>
              <div style={styles.contactValue}>+241 74 00 18 35</div>
            </div>
          </a>

          <button onClick={handleWhatsApp} style={styles.whatsappBtn} className="hover-btn">
            <MessageCircle size={20} /> WhatsApp Express
          </button>
        </div>

        <form onSubmit={handleEmailSubmit} style={styles.formCard}>
          <h4 style={{ marginTop: 0, marginBottom: '20px' }}>Envoyer un message</h4>
          <div style={styles.inputGroup}>
            <User size={16} style={styles.inputIcon} />
            <input
              name="nom"
              type="text"
              placeholder="Votre nom"
              style={styles.input}
              required
              value={formData.nom}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <Mail size={16} style={styles.inputIcon} />
            <input
              name="email"
              type="email"
              placeholder="Email"
              style={styles.input}
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div style={styles.inputGroup}>
            <MessageSquare size={16} style={{ ...styles.inputIcon, top: '15px' }} />
            <textarea
              name="message"
              placeholder="Votre message..."
              style={{ ...styles.input, height: '100px', paddingTop: '12px' }}
              required
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" style={styles.submitBtn}>
            Envoyer le message <Send size={16} />
          </button>
        </form>
      </div>
    </PageWrapper>
  );
};

// --- PAGE FAQ ---
export const FAQ = () => {
  const [hoverIdx, setHoverIdx] = useState(null);
  const questions = [
    { q: "Les gardes sont-elles fiables ?", a: "Oui, nos données sont synchronisées avec le calendrier officiel de l'ordre des pharmaciens.", ref: "https://www.sante.gouv.ga" },
    { q: "Quelles sont les assurances acceptées ?", a: "La majorité des pharmacies acceptent la CNAMGS et les assurances privées comme Ascoma.", ref: "https://www.cnamgs.ga" },
    { q: "Puis-je commander mes médicaments ?", a: "PharmaGab facilite la localisation, mais l'achat final se fait en pharmacie selon la loi gabonaise.", ref: "https://www.opn-gabon.com/" },
    { q: "Mécanismes des produits pharmaceutiques ?", a: "Cliquez sur ce lien pour découvrir les mécanismes de traitement et les lois en vigueur.", ref: "https://www.opn-gabon.com/" },
  ];

  return (
    <PageWrapper title="FAQ" subtitle="Besoin d'aide ?" image={faqImg}>
      <div style={styles.faqContainer}>
        {questions.map((item, i) => (
          <div
            key={i}
            style={{ ...styles.faqCard, borderColor: hoverIdx === i ? 'var(--gab-green)' : '#eee' }}
            onMouseEnter={() => setHoverIdx(i)}
            onMouseLeave={() => setHoverIdx(null)}
            className="hover-card"
          >
            <div style={styles.faqQuestion}><HelpCircle size={18} color="var(--gab-blue)" /> {item.q}</div>
            <div style={styles.faqAnswer}>{item.a}</div>
            {item.ref && <a href={item.ref} target="_blank" rel="noreferrer" style={styles.refLink}>En savoir plus <ExternalLink size={12} /></a>}
          </div>
        ))}
      </div>
    </PageWrapper>
  );
};

// --- STYLES ---
const styles = {
  heroImageContainer: { width: '100%', height: '180px', borderRadius: '24px', overflow: 'hidden', marginBottom: '20px' },
  heroImage: { width: '100%', height: '100%', objectFit: 'cover' },
  card: { backgroundColor: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  text: { fontSize: '15px', lineHeight: '1.6', color: '#4b5563' },
  carouselContainer: { position: 'relative', width: '100%', height: '220px', borderRadius: '24px', overflow: 'hidden', marginBottom: '20px' },
  carouselImg: { width: '100%', height: '100%', objectFit: 'cover', transition: 'all 0.8s ease' },
  carouselOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' },
  carouselText: { color: 'white', fontWeight: '700', margin: 0, fontSize: '16px' },
  sectionTitle: { fontSize: '18px', fontWeight: '800', marginBottom: '15px' },
  testimonialWrapper: { overflowX: 'auto', paddingBottom: '10px' },
  testimonialScroll: { display: 'flex', gap: '15px', width: 'max-content' },
  testimonialCard: { backgroundColor: 'white', padding: '15px', borderRadius: '20px', width: '240px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #f3f4f6' },
  avatar: { width: '30px', height: '30px', borderRadius: '50%', backgroundColor: 'var(--gab-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  contactContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' },
  contactSidebar: { display: 'flex', flexDirection: 'column', gap: '15px' },
  formCard: { backgroundColor: 'white', padding: '25px', borderRadius: '24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
  inputGroup: { position: 'relative', marginBottom: '15px' },
  inputIcon: { position: 'absolute', left: '15px', top: '15px', color: '#9ca3af' },
  input: { width: '100%', padding: '12px 15px 12px 45px', borderRadius: '15px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' },
  submitBtn: { width: '100%', padding: '15px', borderRadius: '15px', border: 'none', backgroundColor: 'var(--gab-blue)', color: 'white', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer', transition: 'all 0.3s ease' },
  statsGrid: { display: 'flex', gap: '15px', marginTop: '20px' },
  statItem: { flex: 1, padding: '15px', backgroundColor: '#f9fafb', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'inherit' },
  statLabel: { fontSize: '11px', fontWeight: '700' },
  contactItem: { backgroundColor: 'white', padding: '15px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '15px', textDecoration: 'none', color: 'inherit' },
  iconCircle: { width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  contactLabel: { fontSize: '11px', color: 'var(--text-gray)' },
  contactValue: { fontSize: '14px', fontWeight: '700' },
  whatsappBtn: { backgroundColor: '#25D366', color: 'white', border: 'none', padding: '15px', borderRadius: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', cursor: 'pointer' },
  faqContainer: { display: 'flex', flexDirection: 'column', gap: '15px' },
  faqCard: { backgroundColor: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #eee' },
  faqQuestion: { fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' },
  faqAnswer: { fontSize: '14px', color: 'var(--text-gray)', marginTop: '8px' },
  refLink: { fontSize: '11px', color: 'var(--gab-blue)', textDecoration: 'none', fontWeight: '700', marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' },
  // Ajout du style pour le header de l'accordéon
  accordionHeader: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '15px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none'
  }
};