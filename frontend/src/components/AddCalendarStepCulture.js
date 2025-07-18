import React from 'react';

function AddCalendarStepCulture({ cultures, selectedCulture, setSelectedCulture }) {
  return (
    <div>
      <h3>Choisir une culture</h3>
      <ul style={{ padding: 0, listStyle: "none" }}>
        {cultures.map(c => (
          <li key={c.id} style={{ margin: 8 }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="radio"
                checked={selectedCulture === c.id}
                onChange={() => setSelectedCulture(c.id)}
                style={{ marginRight: 8 }}
              />
              {c.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddCalendarStepCulture;