import React, { useEffect, useState } from 'react';
import './WeatherForecastDetailsTable.css'; // Assurez-vous que le nom correspond

const API_KEY = '99caae3ec4281ba3000a0325fa291946';

// La fonction groupByDay ne change pas, elle est parfaite
function groupByDay(list) {
  const days = {};
  list.forEach(item => {
    const dayKey = item.dt_txt.slice(0, 10);
    if (!days[dayKey]) days[dayKey] = [];
    days[dayKey].push(item);
  });
  return Object.entries(days).slice(0, 6);
}

export default function WeatherForecastDetailsTable({ position }) {
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
        if (!res.ok) {
          throw new Error('La requête météo a échoué. Veuillez réessayer.');
        }
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

  // --- Rendu conditionnel ---
  if (loading) {
    return <div className="loading-message">Chargement des prévisions détaillées...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (forecast.length === 0) {
    return <div className="loading-message">Aucune donnée de prévision disponible pour ce lieu.</div>;
  }

  return (
    <div className="weather-details-container">
      <h3 className="details-title">Prévisions sur 6 jours</h3>
      {forecast.map(([day, slots]) => (
        <div key={day} className="weather-day-block">
          <h4 className="weather-day-title">
            {new Date(day).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </h4>
          <table className="details-table">
            <thead>
              <tr>
                <th>Heure</th>
                <th></th>
                <th>Conditions</th>
                <th>Temp.</th>
                <th>Humidité</th>
                <th>Pluie (3h)</th>
                <th>Vent</th>
              </tr>
            </thead>
            <tbody>
              {slots.map((item, i) => (
                <tr key={i}>
                  <td>{item.dt_txt.slice(11, 16)}</td>
                  <td>
                    <img
                      src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                      alt={item.weather[0].description}
                      className="weather-icon" // Utilisation d'une classe CSS
                    />
                  </td>
                  <td>{item.weather[0].description}</td>
                  <td className="temp-data">{Math.round(item.main.temp)}°C</td>
                  <td>{item.main.humidity}%</td>
                  <td>{item.rain?.['3h'] ? `${item.rain['3h'].toFixed(1)} mm` : '-'}</td>
                  <td>{item.wind?.speed ? `${Math.round(item.wind.speed * 3.6)} km/h` : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}