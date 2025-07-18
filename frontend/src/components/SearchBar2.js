import { useState, useRef } from 'react';
import './SearchBar2.css';
function SearchBar2({ onResult }) {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const previousQueryRef = useRef('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length < previousQueryRef.current.length) {
      previousQueryRef.current = value;
      return;
    }

    if (value.trim().length < 3) {
      setSuggestions([]);
      previousQueryRef.current = value;
      return;
    }

    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`;
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.features && data.features.length > 0) {
          setSuggestions(data.features.map(feature => ({
            display_name:
              feature.properties.label ||
              [feature.properties.name, feature.properties.city, feature.properties.country]
                .filter(Boolean)
                .join(', '),
            lat: feature.geometry.coordinates[1],
            lon: feature.geometry.coordinates[0],
          })));
        } else {
          setSuggestions([]);
        }
      })
      .catch(() => setSuggestions([]));

    previousQueryRef.current = value;
  };

  const handleSelect = (place) => {
    const latlng = [parseFloat(place.lat), parseFloat(place.lon)];
    // Ajoute les infos nécessaires pour le header
    const cityObj = {
      name: place.display_name,
      country: place.country || '',
      timezone: place.timezone || 0
    };
    onResult(latlng, place.display_name, cityObj);
    setQuery('');
    setSuggestions([]);
  };


  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          value={query}
          onChange={handleInputChange}
          placeholder="Rechercher un lieu..."
          className="search-input"
        />
        <button
          className="search-loupe-btn"
          type="button"
          onClick={() => {
            if (suggestions.length > 0) handleSelect(suggestions[0]);
          }}
          tabIndex={-1}
          aria-label="Rechercher"
        >
          <span className="material-symbols-outlined">search</span>
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((place, idx) => (
            <li key={idx} onClick={() => handleSelect(place)}>
              {place.display_name || JSON.stringify(place)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
export default SearchBar2;