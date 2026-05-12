import React, { useState, useEffect } from 'react';
import {
    User, Mail, Calendar, LogOut, Loader2, MapPin, Edit2, Check, X, ShieldCheck
} from 'lucide-react';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ nom: '', email: '' });

    // État pour gérer la largeur de l'écran en JS
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
                    setEditForm({ nom: data.nom, email: data.email });
                }
            } catch (error) { console.error("Erreur:", error); }
            finally { setLoading(false); }
        };
        fetchProfile();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    if (loading) {
        return (
            <div style={styles.loaderContainer}>
                <Loader2 style={styles.spinner} size={48} />
                <p style={{ marginTop: '10px', color: '#009e60', fontWeight: '500' }}>Chargement...</p>
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
                            <User size={isMobile ? 32 : 40} color="white" />
                        </div>
                        <h2 style={{
                            ...styles.userName,
                            fontSize: isMobile ? '20px' : '24px'
                        }}>{userData.nom}</h2>
                        <div style={styles.locationTag}>
                            <MapPin size={14} /> <span>Libreville, Gabon</span>
                        </div>
                    </div>

                    {/* Infos */}
                    <div style={styles.body}>
                        <div style={styles.infoItem}>
                            <Mail size={20} color="#666" />
                            <div style={styles.textGroup}>
                                <label style={styles.label}>Email</label>
                                {isEditing ? (
                                    <input
                                        style={styles.input}
                                        value={editForm.email}
                                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                    />
                                ) : (
                                    <p style={styles.value}>{userData.email}</p>
                                )}
                            </div>
                        </div>

                        <div style={styles.infoItem}>
                            <Calendar size={20} color="#666" />
                            <div style={styles.textGroup}>
                                <label style={styles.label}>Membre depuis</label>
                                <p style={styles.value}>
                                    {new Date(userData.created_at).toLocaleDateString('fr-FR', {
                                        year: 'numeric', month: 'short', day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={styles.actions}>
                        {isEditing ? (
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button onClick={() => setIsEditing(false)} style={styles.saveBtn}><Check size={18} /> Enregistrer</button>
                                <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}><X size={18} /></button>
                            </div>
                        ) : (
                            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
                                <Edit2 size={18} /> Modifier le profil
                            </button>
                        )}

                        <button onClick={handleLogout} style={styles.logoutBtn}>
                            <LogOut size={18} /> Déconnexion
                        </button>
                    </div>
                </div>
            ) : (
                <div style={styles.card}>
                    <p>Veuillez vous connecter pour voir votre profil.</p>
                    <button onClick={() => window.location.href = '/login'} style={styles.editBtn}>Connexion</button>
                </div>
            )}
        </div>
    );
};

// --- STYLES ADAPTATIFS ---
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '90vh',
        backgroundColor: '#f4f7f6',
        padding: '10px'
    },
    loaderContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh'
    },
    spinner: {
        animation: 'spin 1s linear infinite',
        color: '#009e60'
    },
    card: {
        backgroundColor: 'white',
        borderRadius: '24px',
        boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
        maxWidth: '400px',
        transition: 'all 0.3s ease'
    },
    header: {
        marginBottom: '20px',
        textAlign: 'center'
    },
    avatarCircle: {
        backgroundColor: '#009e60',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 auto 12px',
        boxShadow: '0 4px 10px rgba(0, 158, 96, 0.3)'
    },
    userName: {
        fontWeight: '700',
        color: '#2c3e50',
        margin: '0'
    },
    locationTag: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        color: '#7f8c8d',
        fontSize: '13px',
        marginTop: '4px'
    },
    body: {
        textAlign: 'left',
        marginBottom: '25px'
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 0',
        borderBottom: '1px solid #f1f1f1'
    },
    textGroup: {
        display: 'flex',
        flexDirection: 'column'
    },
    label: {
        fontSize: '11px',
        color: '#bdc3c7',
        textTransform: 'uppercase',
        fontWeight: 'bold'
    },
    value: {
        fontSize: '15px',
        color: '#34495e',
        margin: '0'
    },
    input: {
        border: '1px solid #ddd',
        borderRadius: '6px',
        padding: '4px 8px',
        fontSize: '14px',
        outline: 'none'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    },
    editBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: '#f8f9fa',
        color: '#2c3e50',
        border: 'none',
        padding: '14px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px'
    },
    saveBtn: {
        flex: 1,
        backgroundColor: '#009e60',
        color: 'white',
        border: 'none',
        padding: '12px',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        fontWeight: '600'
    },
    cancelBtn: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
        border: 'none',
        padding: '12px',
        borderRadius: '12px',
        cursor: 'pointer'
    },
    logoutBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        backgroundColor: 'transparent',
        color: '#e74c3c',
        border: '1px solid #e74c3c',
        padding: '12px',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '14px'
    }
};

export default Profile;