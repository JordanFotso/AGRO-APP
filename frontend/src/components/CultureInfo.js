import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CultureInfo({ cultureId, onClose }) {
  const [culture, setCulture] = useState(null);

  useEffect(() => {
    if (!cultureId) return;
    axios.get(`/api/cultures/${cultureId}`)
      .then(res => setCulture(res.data))
      .catch(() => setCulture(null));
  }, [cultureId]);

  if (!culture) return (
    <div
      style={{
        background: "#e0f7fa",
        borderRadius: 12,
        boxShadow: "0 4px 18px -2px rgba(0,0,0,0.13)",
        padding: 24,
        minWidth: 220,
        maxWidth: 260,
        marginLeft: 24,
        color: "#222",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      <b>Chargement...</b>
    </div>
  );

  return (
    <div
      style={{
        background: "#e0f7fa",
        borderRadius: 12,
        boxShadow: "0 4px 18px -2px rgba(0,0,0,0.13)",
        padding: 24,
        minWidth: 220,
        maxWidth: 260,
        marginLeft: 24,
        color: "#222",
        fontFamily: "Poppins, sans-serif",
        position: "relative"
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 8,
          right: 12,
          background: "none",
          border: "none",
          fontSize: 18,
          color: "#009688",
          cursor: "pointer"
        }}
        title="Fermer"
      >×</button>
      <h4 style={{ color: "#009688", marginBottom: 10 }}>{culture.name}</h4>
      <div><b>Description :</b> {culture.description}</div>
      {/* Ajoute ici d'autres infos du modèle Culture si besoin */}
    </div>
  );
}

export default CultureInfo;