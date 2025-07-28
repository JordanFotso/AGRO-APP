import axios from 'axios';

export async function getAgglomerationName(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;
  try {
    const response = await axios.get(url);
    const address = response.data.address;
    // Prend le champ le plus précis disponible
    return (
      address.suburb ||
      address.neighbourhood ||
      address.village ||
      address.town ||
      address.city ||
      address.county ||
      address.state ||
      "Lieu inconnu"
    );
  } catch (error) {
    console.error('Erreur géocodage Nominatim:', error.message);
    return "Erreur";
  }
}
