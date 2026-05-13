import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, ArrowRight, Pill, UserRound, CheckCircle2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  // CORRECTION 1 : Initialisation complète avec tous les champs attendus par Neon
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    mot_de_passe: '',
    quartier: '',
    photo_url: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' // Image par défaut obligatoire
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? 'login' : 'register';
    const url = `https://pharmagab-brn6.vercel.app/api/auth/${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/profile');
        }, 2000);
      } else {
        // Affiche l'erreur précise du serveur (ex: "Email déjà utilisé")
        alert(data.error || data.message || "Erreur lors de l'authentification");
      }
    } catch (err) {
      console.error("Erreur auth:", err);
      alert("Le serveur PharmaGab ne répond pas. Vérifie ta connexion.");
    }
  };

  return (
    <div className="animate-fade" style={styles.container}>
      {showSuccess && (
        <div style={styles.successOverlay} className="animate-slide-up">
          <div style={styles.successCard}>
            <CheckCircle2 size={50} color="#009e60" />
            <h3 style={styles.successTitle}>
              {isLogin ? `Heureux de vous revoir !` : `Bienvenue, ${formData.nom} !`}
            </h3>
            <p style={styles.successSub}>Accès à votre espace PharmaGab...</p>
          </div>
        </div>
      )}

      <div style={styles.authBox}>
        <div style={styles.logoWrapper}>
          <Link to="/" style={styles.logoLink}>
            <div style={styles.logoContainer}>
              <UserRound size={45} color="#fcd116" />
              <Pill size={22} color="#fcd116" style={styles.pillIcon} />
            </div>
            <span style={styles.logoText}>Pharma<span style={{ color: '#fcd116' }}>Gab</span></span>
          </Link>
        </div>

        <div style={styles.header}>
          <h2 style={styles.title}>{isLogin ? 'Bon retour !' : 'Créer un compte'}</h2>
          <p style={styles.subtitle}>
            {isLogin ? 'Connectez-vous pour voir vos pharmacies.' : 'Rejoignez-nous pour un suivi personnalisé.'}
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
              {/* CORRECTION 2 : Ajout du name et du onChange pour le quartier */}
              <select
                name="quartier"
                style={styles.input}
                onChange={handleInputChange}
                required
              >
                <option value="">Votre quartier...</option>
                <option value="acae">Acae</option>

                <option value="akanda">Akanda</option>

                <option value="aeroport">Aéroport</option>

                <option value="akebe">Akébé</option>

                <option value="alibandeng">Alibandeng</option>

                <option value="amities">Amitiés</option>

                <option value="angondje">Angondjé</option>

                <option value="awendje">Awendjé</option>

                <option value="bikele">Bikélé</option>

                <option value="bas_de_gue_gue">Bas de Gué-Gué</option>

                <option value="batterie_4">Batterie IV</option>

                <option value="bel_air">Bel Air</option>

                <option value="belle_vue">Belle-vue</option>

                <option value="besieux">Bésieux</option>

                <option value="centre_ville">Centre Ville</option>

                <option value="charbonnages">Charbonnages</option>

                <option value="cite_caistab">Cité Caistab</option>

                <option value="cite_democratie">Cité de la Démocratie</option>

                <option value="derriere_la_prison">Derrière la Prison</option>

                <option value="glass">Glass</option>

                <option value="gare_routiere">Gare Routière</option>

                <option value="haut_de_gue_gue">Haut de Gué-Gué</option>

                <option value="iai">IAI</option>

                <option value="lalala">Lalala</option>

                <option value="london">London</option>

                <option value="louis">Louis</option>

                <option value="mindoube">Mindoubé</option>

                <option value="mont_bouet">Mont-Bouët</option>

                <option value="nomba_domaine">Nomba Domaine</option>

                <option value="nzeng_ayong">Nzeng Ayong</option>

                <option value="niali">Niali</option>

                <option value="okala">Okala</option>

                <option value="oloumi">Oloumi</option>

                <option value="ondogo">Ondogo</option>

                <option value="ozangue">Ozangué</option>

                <option value="owendo">Owendo</option>

                <option value="petit_paris">Petit Paris</option>

                <option value="pk5">PK 5</option>

                <option value="pk6">PK 6</option>

                <option value="pk7">PK 7</option>

                <option value="pk8">PK 8</option>

                <option value="pk9">PK 9</option>

                <option value="pk10">PK 10</option>

                <option value="pk11">PK 11</option>

                <option value="pk12">PK 12</option>

                <option value="pk13">PK 13</option>

                <option value="essassa">Essassa</option>

                <option value="plain_ciel">Plain Ciel</option>

                <option value="plaine_niger">Plaine Niger</option>

                <option value="pont_nomba">Pont Nomba</option>

                <option value="sainte_anne">Sainte Anne</option>

                <option value="sotega">Sotéga</option>

                <option value="toulon">Toulon</option>
              </select>
            </div>
          )}

          <div style={styles.inputGroup}>
            <Lock size={18} style={styles.icon} />
            {/* CORRECTION 3 : Ajout du name="mot_de_passe" crucial pour le backend */}
            <input
              name="mot_de_passe"
              type="password"
              placeholder="Mot de passe"
              style={styles.input}
              onChange={handleInputChange}
              required
            />
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

// STYLES (Inchangés mais vérifie les couleurs hexadécimales si tes variables CSS buggent)
const styles = {
  container: { minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', backgroundColor: '#f9fafb', position: 'relative' },
  successOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
  successCard: { textAlign: 'center', backgroundColor: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' },
  successTitle: { fontSize: '22px', fontWeight: '800', color: '#1f2937', margin: 0 },
  successSub: { color: '#6b7280', fontSize: '14px' },
  authBox: { backgroundColor: 'white', width: '100%', maxWidth: '400px', padding: '40px 30px', borderRadius: '30px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' },
  logoWrapper: { display: 'flex', justifyContent: 'center', marginBottom: '20px' },
  logoLink: { textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' },
  logoContainer: { position: 'relative', width: '60px', height: '60px', backgroundColor: '#009e60', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  pillIcon: { position: 'absolute', bottom: '5px', right: '5px', backgroundColor: 'white', borderRadius: '50%', padding: '2px', border: '2px solid #009e60' },
  logoText: { fontSize: '18px', fontWeight: '900', color: '#009e60', letterSpacing: '-0.5px' },
  header: { textAlign: 'center', marginBottom: '30px' },
  title: { fontSize: '24px', fontWeight: '800', margin: '0 0 10px 0', color: '#1f2937' },
  subtitle: { fontSize: '14px', color: '#6b7280', lineHeight: '1.4' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px' },
  inputGroup: { position: 'relative', display: 'flex', alignItems: 'center' },
  icon: { position: 'absolute', left: '15px', color: '#9ca3af' },
  input: { width: '100%', padding: '12px 15px 12px 45px', borderRadius: '12px', border: '1px solid #e5e7eb', fontSize: '14px', outline: 'none' },
  submitBtn: { backgroundColor: '#009e60', color: 'white', padding: '14px', borderRadius: '12px', border: 'none', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' },
  footer: { marginTop: '25px', textAlign: 'center', fontSize: '14px', color: '#6b7280' },
  switchBtn: { background: 'none', border: 'none', color: '#3a7ca5', fontWeight: '700', marginLeft: '5px', cursor: 'pointer' }
};

export default Auth;