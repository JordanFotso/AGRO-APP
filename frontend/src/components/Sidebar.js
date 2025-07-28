import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const hoverZoneRef = useRef();
  const sidebarRef = useRef();

  React.useEffect(() => {
    function handleMouseMove(e) {
      // Vérifie si la souris est dans la zone de détection OU dans la sidebar
      const inHoverZone = e.clientX < 100;
      const inSidebar = sidebarRef.current && sidebarRef.current.contains(e.target);
      if (inHoverZone || inSidebar) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    }
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Zone invisible pour détecter le survol du bord gauche */}
      <div
        ref={hoverZoneRef}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 100,
          height: '100vh',
          zIndex: 2001,
          background: 'transparent',
          transition: 'width 0.2s'
        }}
      />
      <nav
        ref={sidebarRef}
        className="sidebar"
        style={{
          left: 0,
          top: 0,
          width: open ? 80 : 0,
          minWidth: open ? 80 : 0,
          overflow: 'hidden',
          transition: 'width 0.2s, min-width 0.2s',
          zIndex: 2200
        }}
      >
        <div className="sidebar-logo" style={{ opacity: open ? 1 : 0, transition: 'opacity 0.2s' }}>
          <span role="img" aria-label="logo" style={{ fontSize: 32 }}>🌱</span>
        </div>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" end>
              <span className="material-symbols-outlined sidebar-icon">home</span>
              {open && <span className="sidebar-label">Accueil</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/meteo">
              <span className="material-symbols-outlined sidebar-icon">cloud</span>
              {open && <span className="sidebar-label">Météo</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/agro">
              <span className="material-symbols-outlined sidebar-icon">agriculture</span>
              {open && <span className="sidebar-label">Agro</span>}
            </NavLink>
          </li>
        </ul>
        <div className="sidebar-profile">
          <NavLink to="/profil">
            <span className="material-symbols-outlined sidebar-icon">account_circle</span>
            {open && <span className="sidebar-label">Profil</span>}
          </NavLink>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;