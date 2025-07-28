import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useRef,useEffect } from 'react';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import './MapWithLocation.css'

// Réglage de l'icône par défaut
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Composant pour recentrer la carte et afficher le marqueur
function LocateButton({ onLocate }) {
  const map = useMap();

  const handleLocate = () => {
    if (!navigator.geolocation) {
      alert("La géolocalisation n'est pas supportée par ce navigateur.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latlng = [latitude, longitude];
        map.setView(latlng, 18);
        onLocate(latlng); // <-- Ce callback met à jour la position dans Meteo.js
      },
      () => {
        alert("Impossible d'obtenir votre position.");
      }
    );
  };

  return (
    <img
      src="/gps-icon.svg"
      alt="Localiser"
      onClick={handleLocate}
      className="locate-button"
    />
  );
}

function CenterMapOnPosition({ position }) {
  const map = useMap();
  if (position) {
    map.setView(position, map.getZoom(), { animate: true });
  }
  return null;
}

// SearchBar avec Photon
function SearchBar({ onResult }) {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState('');
  const previousQueryRef = useRef('');
  const map = useMap();

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
            display_name: feature.properties.name + ', ' + (feature.properties.city || ''),
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
    map.setView(latlng, 18);
    onResult(latlng, place.display_name);
    setQuery(place.display_name);
    setSuggestions([]);
  };

  return (
    <div className="search-container">
      <input
        value={query}
        onChange={handleInputChange}
        placeholder="Rechercher un lieu..."
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestion-list">
          {suggestions.map((place, idx) => (
            <li key={idx} onClick={() => handleSelect(place)}>
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ClickToSetMarker({ onMapClick }) {
  useMapEvents({
    click(e) {
      const latlng = [e.latlng.lat, e.latlng.lng];
      onMapClick(latlng);
    }
  });
  return null;
}

function MapWithLocation({ position, setPosition, popupText }) {
  const markerRef = useRef();

  return (
    <div
      style={{
        position: 'fixed', // ou 'absolute' selon ton layout
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1 // doit être inférieur à la sidebar et au sliding panel
      }}
    >
      <MapContainer
        center={position}
        zoom={16}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false} // Désactive le zoomControl par défaut
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Ajoute le composant qui gère le clic */}
        <ClickToSetMarker onMapClick={setPosition} />

        {position && (
          <Marker position={position} ref={markerRef}>
            <Popup>{popupText}</Popup>
          </Marker>
        )}

        <CenterMapOnPosition position={position} />
        <LocateButton onLocate={setPosition} />
        <ZoomControl position="topright" /> {/* Ajoute le zoom à droite */}
      </MapContainer>
    </div>
  );
}  

export default MapWithLocation;
