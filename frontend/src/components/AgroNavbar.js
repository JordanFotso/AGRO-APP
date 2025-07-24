import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AgroNavbar.css';

function AgroNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="agro-navbar">
      <div className="agro-navbar-title">Agronomie</div>
      <div className="agro-navbar-tabs">
        <div
          className={`agro-navbar-tab${location.pathname === '/agro/cultures' ? ' active' : ''}`}
          onClick={() => navigate('/agro/cultures')}
        >
          <span className="material-symbols-outlined agro-navbar-icon">spa</span>
          <span className="agro-navbar-label">Plantation</span>
        </div>
        <div
          className={`agro-navbar-tab${location.pathname === '/agro/calendriers' ? ' active' : ''}`}
          onClick={() => navigate('/agro/calendriers')}
        >
          <span className="material-symbols-outlined agro-navbar-icon">calendar_month</span>
          <span className="agro-navbar-label">Calendriers</span>
        </div>
        <div
          className={`agro-navbar-tab${location.pathname === '/agro/taches' ? ' active' : ''}`}
          onClick={() => navigate('/agro/taches')}
        >
          <span className="material-symbols-outlined agro-navbar-icon">task</span>
          <span className="agro-navbar-label">Tâches</span>
        </div>
      </div>
    </nav>
  );
}

export default AgroNavbar;