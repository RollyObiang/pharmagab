import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, ArrowRight, Pill, UserRound, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ nom: '', email: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // On déclenche l'affichage du message pro
    setShowSuccess(true);

    // Redirection après 2 secondes pour laisser le temps de lire
    setTimeout(() => {
      navigate('/');
    }, 2500);
  };

  return (
    <div className="animate-fade" style={styles.container}>
      {/* MESSAGE DE SUCCÈS PRO */}
      {showSuccess && (
        <div style={styles.successOverlay} className="animate-slide-up">
          <div style={styles.successCard}>
            <CheckCircle2 size={50} color="var(--gab-green)" />
            <h3 style={styles.successTitle}>
              {isLogin ? `Heureux de vous revoir !` : `Bienvenue, ${formData.nom || 'Cher utilisateur'} !`}
            </h3>
            <p style={styles.successSub}>Préparation de votre espace PharmaGab...</p>
          </div>
        </div>
      )}

      <div style={styles.authBox}>
        
        <div style={styles.logoWrapper}>
          <Link to="/" style={styles.logoLink}>
            <div style={styles.logoContainer}>
               <UserRound size={45} color="var(--gab-yellow)" />
               <Pill size={22} color="var(--gab-yellow)" style={styles.pillIcon} />
            </div>
            <span style={styles.logoText}>Pharma<span style={{color:'var(--gab-yellow)'}}>Gab</span></span>
          </Link>
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>{isLogin ? 'Bon retour !' : 'Créer un compte'}</h2>
          <p style={styles.subtitle}>
            {isLogin 
              ? 'Connectez-vous pour accéder à vos pharmacies proches.' 
              : 'Rejoignez PharmaGab pour personnaliser votre santé.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <div style={styles.inputGroup}>
              <User size={18} style={styles.icon} />
              <input 
                name="nom"
                type="text" 
                placeholder="Nom complet" 
                style={styles.input} 
                onChange={handleInputChange}
                required 
              />
            </div>
          )}

          <div style={styles.inputGroup}>
            <Mail size={18} style={styles.icon} />
            <input 
              name="email"
              type="email" 
              placeholder="Email" 
              style={styles.input} 
              onChange={handleInputChange}
              required 
            />
          </div>

          {!isLogin && (
            <div style={styles.inputGroup}>
              <MapPin size={18} style={styles.icon} />
              <select style={styles.input} required>
                <option value="">Votre quartier...</option>
                <option value="acae">Acae</option>
                <option value="okala">Okala</option>
                <option value="glass">Glass</option>
                <option value="owendo">Owendo</option>
              </select>
            </div>
          )}

          <div style={styles.inputGroup}>
            <Lock size={18} style={styles.icon} />
            <input type="password" placeholder="Mot de passe" style={styles.input} required />
          </div>

          <button type="submit" style={styles.submitBtn}>
            {isLogin ? 'Se connecter' : 'S\'inscrire'} <ArrowRight size={18} />
          </button>
        </form>

        <div style={styles.footer}>
          <span>{isLogin ? "Nouveau sur PharmaGab ?" : "Déjà un compte ?"}</span>
          <button onClick={() => setIsLogin(!isLogin)} style={styles.switchBtn}>
            {isLogin ? 'Créer un compte' : 'Se connecter'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#f9fafb', position: 'relative' },
  
  // STYLES DU MESSAGE DE SUCCÈS
  successOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  successCard: { textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
  successTitle: { fontSize: '22px', fontWeight: '800', color: 'var(--text-dark)', margin: 0 },
  successSub: { color: 'var(--text-gray)', fontSize: '14px' },

  authBox: { backgroundColor: 'white', width: '100%', maxWidth: '400px', padding: '40px 30px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  logoWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '20px' },
  logoLink: { textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
  logoContainer: { position: 'relative', width: '60px', height: '60px', backgroundColor: 'var(--gab-green)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  pillIcon: { position: 'absolute', bottom: '5px', right: '5px', backgroundColor: 'white', borderRadius: '50%', padding: '2px', border: '2px solid var(--gab-green)' },
  logoText: { fontSize: '18px', fontWeight: '900', color: 'var(--gab-green)', letterSpacing: '-0.5px' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '800', margin: '0 0 10px 0', color: 'var(--text-dark)' },
  subtitle: { fontSize: '14px', color: 'var(--text-gray)', lineHeight: '1.4' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '15px', color: '#9ca3af' },
  input: { width: '100%', padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' },
  submitBtn: { backgroundColor: 'var(--gab-green)', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' },
  footer: { marginTop: '25px', textAlign: 'center', fontSize: '14px', color: 'var(--text-gray)' },
  switchBtn: { background: 'none', border: 'none', color: 'var(--gab-blue)', fontWeight: '700', marginLeft: '5px', cursor: 'pointer' }
};

export default Auth;