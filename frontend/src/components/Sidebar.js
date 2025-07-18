import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <span role="img" aria-label="logo" style={{ fontSize: 32 }}>🌱</span>
      </div>
      <ul className="sidebar-menu">
        <li>
          <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>
            <span className="material-symbols-outlined sidebar-icon">home</span>
            <span className="sidebar-label">Accueil</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/meteo" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="material-symbols-outlined sidebar-icon">cloud</span>
            <span className="sidebar-label">Météo</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/agro" className={({ isActive }) => isActive ? "active" : ""}>
            <span className="material-symbols-outlined sidebar-icon">agriculture</span>
            <span className="sidebar-label">Agro</span>
          </NavLink>
        </li>
      </ul>
      <div className="sidebar-profile">
        <NavLink to="/profil" className={({ isActive }) => isActive ? "active" : ""}>
          <span className="material-symbols-outlined sidebar-icon">account_circle</span>
          <span className="sidebar-label">Profil</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Sidebar;