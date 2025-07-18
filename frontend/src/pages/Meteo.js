import React, { useState, useContext } from 'react';
import { MapWithLocation } from '../components';
import SlidingPanel from '../components/SlidingPanel';
import arrowForward from '../assets/arrow_forward.svg';
import SearchBar2 from '../components/SearchBar2';
import PanelHeader from '../components/PanelHeader';
import WeatherForecastDetailsTable from '../components/WeatherForecastDetailsTable';
import WeatherForecastTable from '../components/WeatherForecastTable';

import LocationHeader from '../components/LocationHeader';
import '../components/LocationHeader.css';
import { UserContext } from '../UserContext';

function Meteo() {
  const [position, setPosition] = useState([4.05, 11.7]);
  const [panelOpen, setPanelOpen] = useState(true);

  const [popupText, setPopupText] = useState('Vous êtes ici');

  const handleSearchResult = (position, label, cityObj) => {
    setPosition(position);
    setPopupText(label);
    setCity(cityObj);
  };

  const [city, setCity] = useState({ name: 'Douala', country: 'CM', timezone: 3600 });

  const handleLocate = async (latlng) => {
    setPosition(latlng);
    setPopupText('Vous êtes ici');
    // Optionnel : requête API pour récupérer le nom du lieu et le fuseau horaire
    // Exemple avec Nominatim ou Photon
    const url = `https://photon.komoot.io/reverse?lat=${latlng[0]}&lon=${latlng[1]}`;
    const res = await fetch(url);
    const data = await res.json();
    const label = data.features?.[0]?.properties?.label || 'Lieu courant';
    setPopupText(label);
    setCity({
      name: label,
      country: data.features?.[0]?.properties?.country || '',
      timezone: 3600 // ou récupère le vrai fuseau si dispo
    });
  };

  // exemple d'utilisation
  const { user, setUser } = useContext(UserContext);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {/* Bouton flottant pour ouvrir le panneau */}
      {!panelOpen && (
        <button
          className="floating-toggle-btn"
          onClick={() => setPanelOpen(true)}
          aria-label="Ouvrir le panneau"
        >
          <img src={arrowForward} alt="ouvrir" style={{ width: 32, height: 32 }} />
        </button>
      )}

      {/* Sliding panel au-dessus de la map */}
      <SlidingPanel open={panelOpen} setOpen={setPanelOpen}>
        <PanelHeader title="Panneau météo">
          <SearchBar2 onResult={handleSearchResult} />
        </PanelHeader>
        <LocationHeader placeName={city.name} city={city} />
        <WeatherForecastTable position={position} />
        <WeatherForecastDetailsTable position={position} />
      </SlidingPanel>

      {/* Map en arrière-plan */}
      <div style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}>
        <MapWithLocation position={position} setPosition={handleLocate} popupText={popupText} />
      </div>

      <footer className="main-footer">
        <div>
          © 2025 Agro App — Propulsé par OpenWeatherMap & Photon
        </div>
      </footer>
    </div>
  );
}

export default Meteo;