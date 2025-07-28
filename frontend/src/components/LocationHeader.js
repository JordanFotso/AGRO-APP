import React from 'react';
import './LocationHeader.css';

export default function LocationHeader({ placeName, city }) {
  const dateStr = city?.time
    ? new Date(city.time).toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : '';
  const timeStr = city?.time
    ? new Date(city.time).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    : '';

  return (
    <>
      <h3 className="location-title">Localisation</h3>
      <div className="location-header">
        <div className="location-name">
          <span className="material-symbols-outlined location-icon">location_on</span>
          {placeName}
        </div>
        <div className="location-date">{dateStr} — {timeStr}</div>
      </div>
    </>
  );
}