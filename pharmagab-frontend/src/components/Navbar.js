// src/components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, LayoutGrid, Info, Phone, HelpCircle } from 'lucide-react';

function Navbar() {
  const navLinks = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/toutes-les-pharmacies", icon: LayoutGrid, label: "Toutes les pharmacies" },
    { to: "/a-propos", icon: Info, label: "Infos" },
    { to: "/contact", icon: Phone, label: "Contact" },
    { to: "/faq", icon: HelpCircle, label: "FAQ" },
  ];

  return (
    <nav style={styles.nav}>
      <ul style={styles.ul}>
        {navLinks.map((link) => (
          <li key={link.to} style={styles.li}>
            <NavLink 
              to={link.to} 
              style={({ isActive }) => ({
                ...styles.link,
                color: isActive ? 'var(--gab-green)' : 'var(--text-gray)',
                borderBottom: isActive ? '3px solid var(--gab-green)' : '3px solid transparent',
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
    </nav>
  );
}

const styles = {
  nav: {
    /* CHANGEMENT ICI : On enlève le fixed bottom */
    position: 'sticky',
    top: '0px', // Se colle en haut au scroll si besoin
    width: '100%',
    backgroundColor: 'white',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
    zIndex: 99,
    // On enlève les arrondis du haut car elle est maintenant collée au header
    borderTopLeftRadius: '0px',
    borderTopRightRadius: '0px',
    borderBottom: '1px solid #f0f0f0',
  },
  ul: { 
    display: 'flex', 
    justifyContent: 'center', // On centre les éléments pour un look plus "web"
    gap: '30px', // Espace entre les boutons
    alignItems: 'center', 
    padding: '0 10px',
    margin: 0,
    listStyle: 'none',
    maxWidth: '1200px', // Largeur max pour les grands écrans
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  li: { textAlign: 'center' },
  link: { 
    display: 'flex', 
    flexDirection: 'row', // Icône et texte côte à côte pour gagner de la place en hauteur
    alignItems: 'center', 
    gap: '8px', 
    fontSize: '13px', 
    fontWeight: '700', 
    padding: '15px 5px', // Espace pour cliquer
    transition: 'all 0.3s ease',
    textDecoration: 'none',
  },
  label: { display: 'inline-block' }
};

export default Navbar;