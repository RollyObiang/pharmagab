import React, { useState, useEffect } from 'react';
import {
    User, Mail, Calendar, LogOut, Loader2, MapPin, Edit2, Check, X, Heart, Pill
} from 'lucide-react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ nom: '', email: '', quartier: '' });

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const fetchFavorites = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('https://pharmagab-brn6.vercel.app/api/auth/favorites', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setFavorites(data);
            }
        };
        fetchFavorites();
    }, []);

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener('resize', handleResize);

        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) { setLoading(false); return; }

            try {
                const response = await fetch('https://pharmagab-brn6.vercel.app/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                    setEditForm({ nom: data.nom, email: data.email, quartier: data.quartier || '' });
                }
            } catch (error) { console.error("Erreur:", error); }
            finally { setLoading(false); }
        };
        fetchProfile();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/'; // Redirection vers l'accueil comme demandé
    };

    const handleUpdate = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('https://pharmagab-brn6.vercel.app/api/auth/update', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(editForm)
            });
            if (response.ok) {
                setUserData({ ...userData, ...editForm });
                setIsEditing(false);
            } else {
                alert("Erreur lors de la mise à jour");
            }
        } catch (error) {
            console.error("Erreur update:", error);
        }
    };

    if (loading) {
        return (
            <div style={styles.loaderContainer}>
                <Loader2 style={styles.spinner} size={48} />
                <p style={{ marginTop: '10px', color: '#009e60', fontWeight: '500' }}>Chargement PharmaGab...</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            {userData ? (
                <div style={{
                    ...styles.card,
                    width: isMobile ? '95%' : '100%',
                    padding: isMobile ? '20px' : '30px'
                }}>
                    {/* Header */}
                    <div style={styles.header}>
                        <div style={styles.avatarCircle}>
                            {userData.photo_url ? (
                                <img src={userData.photo_url} alt="Profil" style={styles.avatarImg} />
                            ) : (
                                <User size={isMobile ? 32 : 40} color="white" />
                            )}
                        </div>
                        <h2 style={{ ...styles.userName, fontSize: isMobile ? '20px' : '24px' }}>
                            {userData.nom}
                        </h2>
                        <div style={styles.locationTag}>
                            <MapPin size={14} /> <span>{userData.quartier || 'Libreville, Gabon'}</span>
                        </div>
                    </div>

                    {/* Infos Section */}
                    <div style={styles.body}>
                        <h3 style={styles.sectionTitle}>Informations Personnelles</h3>

                        <div style={styles.infoItem}>
                            <User size={20} color="#666" />
                            <div style={styles.textGroup}>
                                <label style={styles.label}>Nom Complet</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        value={editForm.nom}
                                        onChange={(e) => setEditForm({ ...editForm, nom: e.target.value })}
                                    />
                                ) : <p style={styles.value}>{userData.nom}</p>}
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <MapPin size={20} color="#666" />
                            <div style={styles.textGroup}>
                                <label style={styles.label}>Quartier</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        value={editForm.quartier}
                                        onChange={(e) => setEditForm({ ...editForm, quartier: e.target.value })}
                                    />
                                ) : <p style={styles.value}>{userData.quartier || 'Non renseigné'}</p>}
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <Mail size={20} color="#666" />
                            <div style={styles.textGroup}>
                                <label style={styles.label}>Email</label>
                                <p style={styles.value}>{userData.email}</p>
                            </div>
                        </div>
                    </div>

                    {/* Pharmacies Favoris Section */}
                    <div style={styles.favSection}>
                        <h3 style={styles.sectionTitle}>
                            <Heart size={18} color="#e74c3c" fill="#e74c3c" /> Mes Pharmacies Favorites
                        </h3>
                        <div style={styles.favList}>
                            {favorites.map(pharma => (
                                <div key={pharma.id} style={styles.favCard}>
                                    <Pill size={16} color="#009e60" />
                                    <div style={{ textAlign: 'left' }}>
                                        <p style={styles.favName}>{pharma.name}</p>
                                        <p style={styles.favLoc}>{pharma.quartier}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        {isEditing ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={handleUpdate} style={styles.saveBtn}><Check size={18} /> Sauvegarder</button>
                                <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}><X size={18} /></button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                                <Edit2 size={18} /> Modifier mon profil
                            </button>
                        )}

                        <button onClick={handleLogout} style={styles.logoutBtn}>
                            <LogOut size={18} /> Déconnexion
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.card}>
                    <p>Veuillez vous connecter pour accéder à votre espace.</p>
                    <button onClick={() => window.location.href = '/auth'} style={styles.editBtn}>Aller à la connexion</button>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '90vh', padding: '20px', backgroundColor: '#f0f2f5', boxSizing: 'border-box' },
    card: { backgroundColor: 'white', borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', width: '100%', maxWidth: '480px', padding: '30px', textAlign: 'center' },
    header: { marginBottom: '30px' },
    avatarCircle: { backgroundColor: '#009e60', width: '90px', height: '90px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 15px', overflow: 'hidden', border: '3px solid white', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' },
    avatarImg: { width: '100%', height: '100%', objectFit: 'cover' },
    userName: { fontWeight: '800', color: '#1a1a1a', margin: '0' },
    locationTag: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px', color: '#666', fontSize: '14px', marginTop: '5px' },
    sectionTitle: { fontSize: '14px', fontWeight: '700', color: '#009e60', textTransform: 'uppercase', textAlign: 'left', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' },
    body: { textAlign: 'left', marginBottom: '30px' },
    infoItem: { display: 'flex', alignItems: 'center', gap: '15px', padding: '15px 0', borderBottom: '1px solid #f8f9fa' },
    textGroup: { display: 'flex', flexDirection: 'column' },
    label: { fontSize: '11px', color: '#a0a0a0', fontWeight: '700' },
    value: { fontSize: '16px', color: '#2d3436', margin: '0', fontWeight: '500' },
    input: { border: '1px solid #009e60', borderRadius: '8px', padding: '6px 10px', fontSize: '15px', outline: 'none', backgroundColor: '#f9fffb' },
    favSection: { marginBottom: '30px' },
    favList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    favCard: { display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', backgroundColor: '#f8f9fa', borderRadius: '15px', border: '1px solid #eee' },
    favName: { margin: 0, fontSize: '14px', fontWeight: '700', color: '#2d3436' },
    favLoc: { margin: 0, fontSize: '12px', color: '#666' },
    actions: { display: 'flex', flexDirection: 'column', gap: '12px' },
    editBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: '#e6f4ea', color: '#009e60', border: 'none', padding: '14px', borderRadius: '15px', cursor: 'pointer', fontWeight: '700' },
    saveBtn: { flex: 1, backgroundColor: '#009e60', color: 'white', border: 'none', padding: '14px', borderRadius: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontWeight: '700' },
    cancelBtn: { backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', padding: '14px', borderRadius: '15px', cursor: 'pointer' },
    logoutBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', backgroundColor: 'transparent', color: '#666', border: '1px solid #eee', padding: '12px', borderRadius: '15px', cursor: 'pointer', fontWeight: '600' },
    loaderContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' },
    spinner: { animation: 'spin 1s linear infinite', color: '#009e60' }
};

export default Profile;