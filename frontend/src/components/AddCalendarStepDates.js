import React from 'react';

function AddCalendarStepDates({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div>
      <h3>Dates</h3>
      <label>
        Début : <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
      </label>
      <br />
      <label>
        Fin : <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
      </label>
    </div>
  );
}

export default AddCalendarStepDates;