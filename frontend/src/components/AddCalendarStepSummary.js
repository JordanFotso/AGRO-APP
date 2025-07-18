import React from 'react';

function AddCalendarStepSummary({ name, cultures, selectedCulture, startDate, endDate, location }) {
  return (
    <div>
      <h3>Résumé</h3>
      <div><b>Nom :</b> {name}</div>
      <div><b>Culture :</b> {cultures.find(c => c.id === selectedCulture)?.name}</div>
      <div><b>Début :</b> {startDate}</div>
      <div><b>Fin :</b> {endDate}</div>
      <div><b>Lieu :</b> {location.name} ({location.lat}, {location.lng})</div>
    </div>
  );
}

export default AddCalendarStepSummary;