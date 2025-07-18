import React from 'react';
import './LocationHeader.css';

export default function LocationHeader({ placeName, city }) {
  // city.timezone est en secondes (ex: 3600 pour UTC+1)
  const now = new Date();
  // Heure UTC + décalage du lieu
  const localTime = new Date(now.getTime() + ((city?.timezone || 0) * 1000 - now.getTimezoneOffset() * 60000));

  const dateStr = localTime.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = localTime.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

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