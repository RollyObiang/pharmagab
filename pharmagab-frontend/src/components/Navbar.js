import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// Ajout de l'icône User
import { Home, LayoutGrid, Info, Phone, HelpCircle, Menu, X, User } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // On ajoute le Profil à la fin de la liste
  const navLinks = [
    { to: "/", icon: Home, label: "Accueil" },
    { to: "/toutes-les-pharmacies", icon: LayoutGrid, label: "Pharmacies" },
    { to: "/a-propos", icon: Info, label: "Infos" },
    { to: "/contact", icon: Phone, label: "Contact" },
    { to: "/faq", icon: HelpCircle, label: "FAQ" },
    { to: "/profile", icon: User, label: "Profil" }, // <-- Nouveau lien
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <div style={styles.logoMobile}>PharmaGab</div>

        <button onClick={toggleMenu} style={styles.burgerButton}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <ul style={{
          ...styles.ul,
          // Gestion du menu responsive
          display: isMenuOpen ? 'flex' : (window.innerWidth > 768 ? 'flex' : 'none'),
          flexDirection: window.innerWidth <= 768 ? 'column' : 'row',
          position: window.innerWidth <= 768 ? 'absolute' : 'static',
          top: '60px',
          left: 0,
          width: window.innerWidth <= 768 ? '100%' : 'auto',
          backgroundColor: 'white',
          padding: window.innerWidth <= 768 ? '20px 0' : '0',
          boxShadow: window.innerWidth <= 768 ? '0 5px 10px rgba(0,0,0,0.1)' : 'none'
        }}>
          {navLinks.map((link) => (
            <li key={link.to} style={styles.li}>
              <NavLink
                to={link.to}
                onClick={() => setIsMenuOpen(false)}
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

// Les styles restent les mêmes, j'ai juste optimisé le responsive dans le JSX au-dessus
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
    color: '#009e60', // Vert Gabon direct si la variable n'est pas chargée
    fontSize: '18px',
  },
  burgerButton: {
    display: window.innerWidth > 768 ? 'none' : 'block',
    background: 'none',
    border: 'none',
    color: '#009e60',
    cursor: 'pointer',
  },
  ul: {
    gap: '20px',
    alignItems: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    zIndex: 999,
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