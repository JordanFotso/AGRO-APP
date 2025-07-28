import React from 'react';
import './SlidingPanel.css';
import arrowBack from '../assets/arrow_back.svg';
import WeatherForecastDetailsTable from '../components/WeatherForecastDetailsTable';

function SlidingPanel({ children, open, setOpen, city, position }) {
  return (
    <div
      className={`sliding-panel${open ? ' open' : ''}`}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        zIndex: 2100, // supérieur à la sidebar si besoin
        boxShadow: '2px 0 12px rgba(0,0,0,0.15)',
        pointerEvents: open ? 'auto' : 'none'
      }}
    >
      {open && (
        <button className="toggle-btn" onClick={() => setOpen(false)}>
          <img src={arrowBack} alt="fermer" style={{ width: 32, height: 32 }} />
        </button>
      )}
      <div className="panel-content">
        {children}
        <WeatherForecastDetailsTable position={position} city={city} />
      </div>
    </div>
  );
}

export default SlidingPanel;
