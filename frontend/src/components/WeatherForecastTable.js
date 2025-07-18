import React, { useEffect, useState } from 'react';

const API_KEY = '99caae3ec4281ba3000a0325fa291946';

// Regroupe les prévisions par jour
function groupByDay(list) {
  const days = {};
  list.forEach(item => {
    const dayKey = item.dt_txt.slice(0, 10);
    if (!days[dayKey]) days[dayKey] = [];
    days[dayKey].push(item);
  });
  return Object.values(days).slice(0, 7);
}

// Utilitaires de calcul
const sumRain = arr =>
  arr.reduce((acc, x) => acc + (x.rain?.['3h'] || 0), 0);

const minMax = (arr, getVal, unit = '') => {
  const vals = arr.map(getVal).filter(v => v !== undefined);
  if (!vals.length) return '—';
  const min = Math.round(Math.min(...vals));
  const max = Math.round(Math.max(...vals));
  return `${min}${unit} / ${max}${unit}`;
};

const minMaxWind = (arr) => minMax(arr, x => x.wind?.speed ? x.wind.speed * 3.6 : undefined, ''); // km/h
const minMaxGust = (arr) => minMax(arr, x => x.wind?.gust ? x.wind.gust * 3.6 : undefined, '');   // km/h

function dominantIcon(arr) {
  const freq = {};
  arr.forEach(x => {
    const icon = x.weather?.[0]?.icon;
    if (icon) freq[icon] = (freq[icon] || 0) + 1;
  });
  return Object.entries(freq).sort((a, b) => b[1] - a[1])[0]?.[0] || arr[0].weather[0].icon;
}

export default function WeatherForecastTable({ position }) {
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
    <div className="weather-table-container">
      <h3>Résumé sur 6 jours</h3>
      <table className="weather-table">
        <thead>
          <tr>
            <th>Jour</th>
            <th></th>
            <th>Pluvio (mm)</th>
            <th>Temp. min/max (°C)</th>
            <th>Hygro min/max (%)</th>
            <th>Vent min/max (km/h)</th>
            <th>Rafales min/max (km/h)</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((dayArr, idx) => {
            const first = dayArr[0];
            return (
              <tr key={idx}>
                <td>{new Date(first.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'short' })}</td>
                <td>
                  <img
                    src={`https://openweathermap.org/img/wn/${dominantIcon(dayArr)}@2x.png`}
                    alt=""
                    style={{ width: 36, height: 36 }}
                  />
                </td>
                <td>{sumRain(dayArr).toFixed(1)}</td>
                <td>{minMax(dayArr, x => x.main?.temp)}</td>
                <td>{minMax(dayArr, x => x.main?.humidity)}</td>
                <td>{minMaxWind(dayArr)}</td>
                <td>{minMaxGust(dayArr)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}