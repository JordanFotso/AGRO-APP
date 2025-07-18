import React from 'react';
import './CultureCard.css';

function CultureCard({ name, onClick, selected }) {
  return (
    <div
      className={`culture-card${selected ? ' selected' : ''}`}
      onClick={onClick}
      style={{
        background: selected ? "#7fffd4" : "#f8f8f8",
        borderRadius: 10,
        // Ombre présente dans tous les cas, plus marquée si sélectionné
        boxShadow: selected
          ? "0 8px 32px -2px rgba(0,0,0,0.22)"
          : "0 4px 18px -2px rgba(0,0,0,0.18)",
        padding: 24,
        margin: 12,
        minWidth: 180,
        cursor: onClick ? "pointer" : "default",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
        fontSize: "1.1rem",
        color: selected ? "#18181b" : "#222",
        transition: "background 0.2s, box-shadow 0.2s, color 0.2s"
      }}
    >
      {name}
    </div>
  );
}

export default CultureCard;