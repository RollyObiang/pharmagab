import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Info, Phone, HelpCircle, Menu, X } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/toutes-les-pharmacies", icon: LayoutGrid, label: "Pharmacies" }, // Label raccourci pour mobile
    { to: "/a-propos", icon: Info, label: "Infos" },
    { to: "/contact", icon: Phone, label: "Contact" },
    { to: "/faq", icon: HelpCircle, label: "FAQ" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {/* Logo ou Titre à gauche sur mobile */}
        <div style={styles.logoMobile}>PharmaGab</div>

        {/* Bouton Burger - Apparaît uniquement sur petit écran via CSS ou logique inline */}
        <button onClick={toggleMenu} style={styles.burgerButton}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Liste des liens - Conditionnelle sur mobile */}
        <ul style={{ 
          ...styles.ul, 
          display: isMenuOpen ? 'flex' : (window.innerWidth > 768 ? 'flex' : 'none') 
        }}>
          {navLinks.map((link) => (
            <li key={link.to} style={styles.li}>
              <NavLink 
                to={link.to} 
                onClick={() => setIsMenuOpen(false)} // Ferme le menu au clic
                style={({ isActive }) => ({
                  ...styles.link,
                  color: isActive ? 'var(--gab-green)' : 'var(--text-gray)',
                  borderBottom: window.innerWidth > 768 && isActive ? '3px solid var(--gab-green)' : '3px solid transparent',
                })}
              >
                {({ isActive }) => (
                  <>
                    <link.icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span style={styles.label}>{link.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    position: 'sticky',
    top: '0px',
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    zIndex: 1000,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 15px',
    height: '60px',
  },
  logoMobile: {
    fontWeight: '800',
    color: 'var(--gab-green)',
    fontSize: '18px',
  },
  burgerButton: {
    display: window.innerWidth > 768 ? 'none' : 'block', // Simple mais efficace
    background: 'none',
    border: 'none',
    color: 'var(--gab-green)',
    cursor: 'pointer',
  },
  ul: { 
    // Sur desktop : ligne horizontale
    // Sur mobile (quand display: flex) : on va forcer le CSS via index.css pour le menu vertical
    display: 'flex', 
    gap: '20px',
    alignItems: 'center', 
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  li: { textAlign: 'center' },
  link: { 
    display: 'flex', 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: '8px', 
    fontSize: '14px', 
    fontWeight: '700', 
    padding: '10px 5px',
    textDecoration: 'none',
  },
  label: { display: 'inline-block' }
};

export default Navbar;