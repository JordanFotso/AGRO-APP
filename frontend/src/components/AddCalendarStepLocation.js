import React, { useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition({ lat: e.latlng.lat, lng: e.latlng.lng, name: '' });
    }
  });
  return <Marker position={[position.lat, position.lng]} />;
}

function AddCalendarStepLocation({ location, setLocation }) {
  const mapRef = useRef();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Recherche Photon
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(value)}&limit=5`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.features && data.features.length > 0) {
      setSuggestions(data.features.map(feature => ({
        display_name:
          feature.properties.label ||
          [feature.properties.name, feature.properties.city, feature.properties.country]
            .filter(Boolean)
            .join(', '),
        lat: feature.geometry.coordinates[1],
        lng: feature.geometry.coordinates[0],
      })));
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setLocation(loc => ({ ...loc, lat: place.lat, lng: place.lng, name: place.display_name }));
    setQuery(place.display_name);
    setSuggestions([]);
    if (mapRef.current) {
      mapRef.current.setView([place.lat, place.lng], 13);
    }
  };

  return (
    <div style={{ width: "100%", height: 400, minHeight: 400, position: "relative" }}>
      {/* Champ de recherche intégré à la map */}
      <div style={{
        position: "absolute",
        top: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        width: 340,
        maxWidth: "90vw"
      }}>
        <input
          value={query}
          onChange={handleInputChange}
          placeholder="Rechercher un lieu..."
          style={{
            width: "100%",
            padding: 10,
            borderRadius: "8px 8px 0 0",
            border: "1px solid #333",
            fontSize: 16,
            background: "rgba(30,30,30,0.92)",
            color: "#fff"
          }}
        />
        {suggestions.length > 0 && (
          <ul style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            background: "rgba(30,30,30,0.92)",
            border: "1px solid #222",
            borderTop: "none",
            maxHeight: 180,
            overflowY: "auto",
            color: "#fff",
            fontSize: 15,
            borderRadius: "0 0 8px 8px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.18)"
          }}>
            {suggestions.map((place, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(place)}
                style={{
                  padding: "10px 12px",
                  cursor: "pointer",
                  color: "#fff",
                  background: "transparent",
                  minHeight: 24,
                  fontSize: 15,
                  transition: "background 0.15s, color 0.15s"
                }}
                onMouseDown={e => e.preventDefault()}
              >
                {place.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
      <MapContainer
        center={[location.lat, location.lng]}
        zoom={7}
        style={{ width: "100%", height: "100%", borderRadius: 12 }}
        whenCreated={mapInstance => { mapRef.current = mapInstance; }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LocationMarker position={location} setPosition={loc => setLocation(l => ({ ...l, lat: loc.lat, lng: loc.lng }))} />
      </MapContainer>
      <div style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        background: "rgba(255,255,255,0.95)",
        borderRadius: 8,
        padding: "6px 14px",
        fontSize: 13,
        zIndex: 1000
      }}>
        <b>Lieu :</b> {location.name || "Cliquez ou cherchez un lieu"}
        <br />
        <b>Lat :</b> {location.lat} <b>Lng :</b> {location.lng}
      </div>
    </div>
  );
}

export default AddCalendarStepLocation;