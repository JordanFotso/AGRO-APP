import axios from 'axios';

// Utilise GeoNames : https://www.geonames.org/export/web-services.html#timezone
export async function getTimezoneForCity(cityName) {
  // Utilise Nominatim pour obtenir les coordonnées de la ville
  const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`;
  const nominatimRes = await axios.get(nominatimUrl);
  console.log("Résultat Nominatim:", nominatimRes.data);
  if (!nominatimRes.data.length) return null;
  const { lat, lon } = nominatimRes.data[0];

  // Utilise GeoNames pour obtenir le fuseau horaire
  const geoNamesUser = 'jordanfotso'; // Remplace par ton username GeoNames !
  const tzUrl = `https://secure.geonames.org/timezoneJSON?lat=${lat}&lng=${lon}&username=${geoNamesUser}`;
  const tzRes = await axios.get(tzUrl);
  console.log("Résultat GeoNames:", tzRes.data);
  return tzRes.data; // Contient timezoneId, gmtOffset, time, etc.
}