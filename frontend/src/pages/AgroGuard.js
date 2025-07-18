import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate, Outlet } from 'react-router-dom';

function AgroGuard() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{
        background: 'rgba(30,30,30,0.97)',
        color: '#fff',
        borderRadius: 12,
        boxShadow: '0 2px 16px rgba(0,0,0,0.22)',
        padding: '32px 24px',
        maxWidth: 340,
        margin: '48px auto',
        fontFamily: 'Poppins, sans-serif'
      }}>
        <h2>Accès réservé</h2>
        <p>
          La page Agro est réservée aux utilisateurs connectés.<br />
          Connectez-vous pour accéder à toutes les fonctionnalités agricoles personnalisées.
        </p>
        <button
          className="profil-btn"
          onClick={() => navigate('/profil')}
        >
          Se connecter
        </button>
      </div>
    );
  }

  // Si connecté, affiche le layout et les sous-pages via Outlet
  return <Outlet />;
}

export default AgroGuard;