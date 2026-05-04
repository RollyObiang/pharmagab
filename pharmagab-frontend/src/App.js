// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import des Composants globaux
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import des Pages
import Accueil from './pages/Accueil';
import ToutesLesPharmacies from './pages/ToutesLesPharmacies';
import { APropos, Contact, FAQ } from './pages/Stubs';
import Auth from './pages/Auth';

function App() {
  return (
    <Router>
      <div className="App" style={styles.appContainer}>
        {/* 1. Le Header en haut */}
        <Header />
        
        {/* 2. La Navbar juste en dessous du Header */}
        <Navbar />
        
        {/* 3. Le contenu principal */}
        <main style={styles.mainContent}>
          <Routes>
            <Route path="/" element={<Accueil />} />
            <Route path="/toutes-les-pharmacies" element={<ToutesLesPharmacies />} />
            <Route path="/a-propos" element={<APropos />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/connexion" element={<Auth />} />
          </Routes>
          
          <Footer />
        </main>
      </div>
    </Router>
  );
}

const styles = {
  appContainer: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f9fafb',
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    // Suppression du paddingBottom car la Navbar n'est plus fixe en bas
    paddingBottom: '0px', 
  }
};

export default App;