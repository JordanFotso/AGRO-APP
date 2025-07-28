import React, { useEffect, useState } from 'react';
// Importez le MÊME fichier CSS que le tableau détaillé
import './WeatherForecastDetailsTable.css'; 

const API_KEY = '99caae3ec4281ba3000a0325fa291946';

// --- Les fonctions utilitaires ne changent pas, elles sont très bien écrites ---

// Regroupe les prévisions par jour
function groupByDay(list) {
  const days = {};
  list.forEach(item => {
    const dayKey = item.dt_txt.slice(0, 10);
    if (!days[dayKey]) days[dayKey] = [];
    days[dayKey].push(item);
  });
  // On retourne les 6 premiers jours pour être cohérent avec l'autre tableau
  return Object.values(days).slice(0, 6);
}

// Calcule la pluie totale
const sumRain = arr =>
  arr.reduce((acc, x) => acc + (x.rain?.['3h'] || 0), 0);

// Calcule les min/max d'une valeur
const minMax = (arr, getVal) => {
  const vals = arr.map(getVal).filter(v => v !== undefined);
  if (!vals.length) return '—';
  const min = Math.round(Math.min(...vals));
  const max = Math.round(Math.max(...vals));
  return `${min} / ${max}`;
};

// Trouve l'icône la plus fréquente de la journée
function dominantIcon(arr) {
  const freq = {};
  arr.forEach(x => {
    const icon = x.weather?.[0]?.icon;
    if (icon) freq[icon] = (freq[icon] || 0) + 1;
  });
  const sortedIcons = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  return sortedIcons.length > 0 ? sortedIcons[0][0] : arr[0]?.weather[0]?.icon;
}


export default function WeatherForecastTable({ position }) {
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null);     // État d'erreur

  useEffect(() => {
    if (!position) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${position[0]}&lon=${position[1]}&units=metric&appid=${API_KEY}&lang=fr`
    )
      .then(res => {
        if (!res.ok) throw new Error('Erreur lors de la récupération du résumé météo.');
        return res.json();
      })
      .then(data => {
        if (data.list && data.list.length > 0) {
          setForecast(groupByDay(data.list));
        } else {
          setForecast([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [position]);

  // --- Rendu conditionnel (identique à l'autre composant pour la cohérence) ---
  if (loading) {
    return <div className="loading-message">Chargement du résumé météo...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (forecast.length === 0) {
    return <div className="loading-message">Aucune donnée de résumé disponible.</div>;
  }

  return (
    // On réutilise les classes du composant de détails
    <div className="weather-details-container">
      <h3 className="details-title">Résumé sur 6 jours</h3>
      <table className="details-table">
        <thead>
          <tr>
            <th>Jour</th>
            <th></th>
            <th>Pluie (mm)</th>
            <th>Temp. (°C)</th>
            <th>Humidité (%)</th>
            <th>Vent (km/h)</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((dayArr, idx) => {
            if (!dayArr || dayArr.length === 0) return null; // Sécurité
            const firstEntry = dayArr[0];
            return (
              <tr key={idx}>
                <td>
                  {new Date(firstEntry.dt * 1000).toLocaleDateString('fr-FR', {
                    weekday: 'long', // 'long' est plus lisible ici
                  })}
                </td>
                <td>
                  <img
                    src={`https://openweathermap.org/img/wn/${dominantIcon(dayArr)}@2x.png`}
                    alt="icône météo"
                    className="weather-icon" // La classe qui ajoute l'ombre
                  />
                </td>
                <td>{sumRain(dayArr).toFixed(1)}</td>
                {/* La classe pour mettre en évidence la température */}
                <td className="temp-data">{minMax(dayArr, x => x.main?.temp)}</td>
                <td>{minMax(dayArr, x => x.main?.humidity)}</td>
                <td>{minMax(dayArr, x => x.wind?.speed ? x.wind.speed * 3.6 : undefined)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}