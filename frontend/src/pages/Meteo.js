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
import { getAgglomerationName } from '../components/geolocation';
import { getTimezoneForCity } from '../components/getTimezoneForCity';

function Meteo() {
  const [position, setPosition] = useState([4.05, 11.7]);
  const [panelOpen, setPanelOpen] = useState(true);

  const [popupText, setPopupText] = useState('Vous êtes ici');

  const handleSearchResult = async (position, label, cityObj) => {
    setPosition(position);
    setPopupText(label);

    // Récupère l'heure locale pour la ville trouvée
    const tzData = await getTimezoneForCity(cityObj.name || label);
    if (tzData) {
      setCity({
        name: cityObj.name || label,
        timezone: tzData.gmtOffset * 3600,
        time: tzData.time
      });
    } else {
      setCity({
        name: cityObj.name || label,
        timezone: 3600,
        time: null
      });
    }
  };

  const [city, setCity] = useState({ name: 'Douala', country: 'CM', timezone: 3600 });

  const handleLocate = async (latlng) => {
    setPosition(latlng);
    const name = await getAgglomerationName(latlng[0], latlng[1]);
    setPopupText(name);

    // Ajoute la récupération du fuseau horaire ici
    const tzData = await getTimezoneForCity(name);
    if (tzData) {
      setCity({
        name,
        timezone: tzData.gmtOffset * 3600,
        time: tzData.time
      });
    } else {
      setCity({
        name,
        timezone: 3600,
        time: null
      });
    }
  };

  const handleCityChange = async (cityName) => {
    const tzData = await getTimezoneForCity(cityName);
    if (tzData) {
      setCity({
        name: cityName,
        timezone: tzData.gmtOffset * 3600, // en secondes
        time: tzData.time // heure locale sous forme de string
      });
    }
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