// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { UserRound, Pill, MapPin, ChevronRight } from 'lucide-react';

function Footer() {
  const provinces = [
    "Estuaire", "Haut-Ogooué", "Moyen-Ogooué", "Ngounié", 
    "Nyanga", "Ogooué-Ivindo", "Ogooué-Lolo", "Ogooué-Maritime", "Woleu-Ntem"
  ];

  const categories = [
    { name: "Pharmacies populaires", path: "/" },
    { name: "Grandes pharmacies", path: "/toutes-les-pharmacies" },
    { name: "Moyennes pharmacies", path: "/toutes-les-pharmacies" }
  ];

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.footerGrid}>
        
        {/* COLONNE 1 : LOGO & TAGLINE */}
        <div style={styles.column}>
          <Link to="/" style={styles.logoContainer}>
            <div style={styles.logoCircle}>
              <UserRound size={20} color="var(--gab-yellow)" />
              <Pill size={10} color="white" style={styles.miniPill} />
            </div>
            <span style={styles.logoText}>PharmaGab</span>
          </Link>
          <p style={styles.tagline}>
            Votre santé, notre priorité au Gabon 🇬🇦. 
            L'annuaire intelligent pour trouver vos médicaments.
          </p>
        </div>

        {/* COLONNE 2 : LOCALISATION (PROVINCES) */}
        <div style={styles.column}>
          <h4 style={styles.sectionTitle}>Localisation</h4>
          <ul style={styles.list}>
            {provinces.map((province) => (
              <li key={province} style={styles.listItem}>
                <MapPin size={12} style={{marginRight: '8px', color: 'var(--gab-green)'}} />
                <span className="footer-link-hover" style={styles.footerLink}>{province}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* COLONNE 3 : CATÉGORIES */}
        <div style={styles.column}>
          <h4 style={styles.sectionTitle}>Catégories</h4>
          <ul style={styles.list}>
            {categories.map((cat) => (
              <li key={cat.name} style={styles.listItem}>
                <ChevronRight size={12} style={{marginRight: '8px', color: 'var(--gab-yellow)'}} />
                <Link to={cat.path} style={styles.footerLink}>{cat.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* COLONNE 4 : NAVIGATION RAPIDE */}
        <div style={styles.column}>
          <h4 style={styles.sectionTitle}>Liens utiles</h4>
          <ul style={styles.list}>
            <li style={styles.listItem}><Link to="/a-propos" style={styles.footerLink}>À propos</Link></li>
            <li style={styles.listItem}><Link to="/contact" style={styles.footerLink}>Contact</Link></li>
            <li style={styles.listItem}><Link to="/faq" style={styles.footerLink}>FAQ</Link></li>
          </ul>
        </div>

      </div>

      {/* BAS DU FOOTER */}
      <div style={styles.bottomSection}>
        <div className="container" style={styles.bottomFlex}>
          <p style={styles.copyright}>
            &copy; 2026 PharmaGab. Tous droits réservés.
          </p>
          <div style={styles.socialIcons}>
            {/* On peut remettre les icônes ici si besoin */}
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#111827', // Noir/Gris très foncé
    color: '#f9fafb',
    padding: '60px 20px 0 20px',
    marginTop: '40px',
  },
  footerGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
    paddingBottom: '40px',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    marginBottom: '20px',
  },
  logoCircle: {
    backgroundColor: '#1f2937',
    width: '45px',
    height: '45px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    border: '1px solid #374151',
  },
  miniPill: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    backgroundColor: 'var(--gab-green)',
    borderRadius: '50%',
    padding: '1px'
  },
  logoText: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#ffffff',
    letterSpacing: '-1px',
  },
  tagline: {
    color: '#9ca3af',
    fontSize: '14px',
    lineHeight: '1.6',
    maxWidth: '250px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    borderLeft: '3px solid var(--gab-green)',
    paddingLeft: '10px',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
  },
  footerLink: {
    textDecoration: 'none',
    color: '#9ca3af',
    fontSize: '14px',
    transition: 'color 0.3s ease',
    cursor: 'pointer',
  },
  bottomSection: {
    borderTop: '1px solid #1f2937',
    padding: '25px 0',
    textAlign: 'center',
  },
  bottomFlex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '15px',
  },
  copyright: {
    fontSize: '13px',
    color: '#6b7280',
    margin: 0,
  },
};

export default Footer;