import React from 'react';

function AddCultureCard({ onClick }) {
  return (
    <div
      className="culture-card add"
      onClick={onClick}
      style={{
        background: "#e0f7fa",
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
        padding: 24,
        margin: 12,
        minWidth: 180,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "#009688",
        fontWeight: 700,
        fontSize: "2rem"
      }}
      title="Ajouter une culture"
    >
      <span className="material-symbols-outlined" style={{ fontSize: 36 }}>add</span>
      <span style={{ fontSize: "1rem", marginTop: 8 }}>Ajouter</span>
    </div>
  );
}

export default AddCultureCard;