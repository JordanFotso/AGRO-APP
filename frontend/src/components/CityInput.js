import React, { useState } from 'react';
import './Weather.css'
function CityInput({ value, onChange, onSearch }) {
  return (
    <div className="city-input">
      <input
        type="text"
        placeholder="Entrez une ville"
        value={value}
        onChange={onChange}
        className="city-input-field"
      />
      <button
        className="city-input-button"
        onClick={onSearch}
        aria-label="Rechercher"
      >
        <span className="material-symbols-outlined">search</span>
      </button>
    </div>
  );
}
export default Weather;