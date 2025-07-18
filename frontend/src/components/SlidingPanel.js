import React from 'react';
import './SlidingPanel.css';
import arrowBack from '../assets/arrow_back.svg';
import WeatherForecastDetailsTable from '../components/WeatherForecastDetailsTable';

function SlidingPanel({ children, open, setOpen, city, position }) {
  return (
    <div
      className={`sliding-panel${open ? ' open' : ''}`}
      style={{
        height: '100vh',
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
