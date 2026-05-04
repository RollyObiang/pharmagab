// src/components/Header.js
import React from 'react';
import { Pill, UserPlus, UserCircle2 } from 'lucide-react'; 
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <div className="container" style={styles.container}>
        {/* Partie Gauche : Logo Comprimé Jaune + Titre PharmaGab */}
        <Link to="/" style={styles.logoLink} className="logo-hover-group">
          <div className="pill-animated" style={styles.iconContainer}>
            {/* Le comprimé passe en Jaune */}
            <Pill color="var(--gab-yellow)" size={28} />
          </div>
          <h1 style={styles.title}>
            Pharma<span style={styles.gabYellow}>Gab</span>
          </h1>
        </Link>

        {/* Partie Droite : Actions */}
        <div style={styles.rightActions}>
          {/* Nouveau Bouton Connexion avec icône Jaune */}
          <Link to="/connexion" style={styles.loginBtn}>
            <UserCircle2 size={24} color="var(--gab-yellow)" />
            <span style={styles.loginText}>Connexion</span>
          </Link>

          {/* Badge Soin Direct */}
          <Link to="/contact" style={styles.userBadge} className="pulse-animation">
            <div style={styles.userIconCircle}>
              <UserPlus color="var(--gab-green)" size={18} />
            </div>
            <span style={styles.badgeText}>Soin Direct</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

const styles = {
  header: {
    background: 'linear-gradient(135deg, var(--gab-green) 0%, #007d4c 100%)',
    color: 'white',
    padding: '12px 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
  },
  container: { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: '0 20px' 
  },
  logoLink: { 
    display: 'flex', 
    alignItems: 'center', 
    gap: '12px', 
    textDecoration: 'none', 
    color: 'white' 
  },
  title: { 
    margin: 0, 
    fontSize: '22px', 
    fontWeight: '900', 
    letterSpacing: '-0.5px' 
  },
  // Style spécifique pour le "Gab" en jaune
  gabYellow: {
    color: 'var(--gab-yellow)',
  },
  rightActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  loginBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    textDecoration: 'none',
    color: 'white',
    fontSize: '13px',
    fontWeight: '700', // Un peu plus gras pour l'équilibre
    padding: '5px 10px',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
  },
  loginText: {
    display: 'inline',
  },
  userBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor: 'white',
    padding: '6px 12px',
    borderRadius: '25px',
    textDecoration: 'none',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  },
  badgeText: { 
    fontSize: '11px', 
    fontWeight: '800', 
    color: 'var(--gab-green)',
    textTransform: 'uppercase'
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userIconCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
};

export default Header;