import React from 'react';

function AddCalendarStepName({ name, setName }) {
  return (
    <div>
      <h3>Nom du calendrier</h3>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom..."
        style={{ width: "100%", padding: 8, borderRadius: 6, border: "1px solid #ccc" }}
      />
    </div>
  );
}

export default AddCalendarStepName;