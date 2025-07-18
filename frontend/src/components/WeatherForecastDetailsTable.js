import React, { useEffect, useState } from 'react';
import './WeatherForecastDetailsTable.css';
const API_KEY = '99caae3ec4281ba3000a0325fa291946';

// Regroupe les prévisions par jour selon dt_txt
function groupByDay(list) {
  const days = {};
  list.forEach(item => {
    const dayKey = item.dt_txt.slice(0, 10); // "YYYY-MM-DD"
    if (!days[dayKey]) days[dayKey] = [];
    days[dayKey].push(item);
  });
  // Retourne les 6 prochains jours
  return Object.entries(days).slice(0, 6);
}

export default function WeatherForecastDetailsTable({ position }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!position) return;
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${position[0]}&lon=${position[1]}&units=metric&appid=${API_KEY}&lang=fr`
    )
      .then(res => res.json())
      .then(data => {
        if (data.list) setForecast(groupByDay(data.list));
      });
  }, [position]);

  return (
    <div className="weather-details-table-container">
      <h3 className="details-title">Prévisions détaillées (créneaux 3h sur 6 jours)</h3>
      {forecast.map(([day, slots], idx) => (
        <div key={day} className="weather-details-day">
          <div className="weather-details-day-title">
            {new Date(day).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
          </div>
          <table className="weather-details-table">
            <thead>
              <tr>
                <th>Heure</th>
                <th></th>
                <th>Conditions</th>
                <th>Temp. (°C)</th>
                <th>Hygro (%)</th>
                <th>Pluvio (mm)</th>
                <th>Vent (km/h)</th>
                <th>Rafales (km/h)</th>
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
                      style={{ width: 36, height: 36 }}
                    />
                  </td>
                  <td>{item.weather[0].description}</td>
                  <td>{Math.round(item.main.temp)}</td>
                  <td>{item.main.humidity}</td>
                  <td>{item.rain?.['3h'] ? item.rain['3h'].toFixed(1) : 0}</td>
                  <td>{item.wind?.speed ? Math.round(item.wind.speed * 3.6) : 0}</td>
                  <td>{item.wind?.gust ? Math.round(item.wind.gust * 3.6) : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}