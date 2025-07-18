import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import AddCalendarStepName from './AddCalendarStepName';
import AddCalendarStepCulture from './AddCalendarStepCulture';
import AddCalendarStepDates from './AddCalendarStepDates';
import AddCalendarStepLocation from './AddCalendarStepLocation';
import AddCalendarStepSummary from './AddCalendarStepSummary';
import './AddCalendarModal.css';

const steps = [
  "Nom",
  "Culture",
  "Dates",
  "Localisation",
  "Résumé"
];

function AddCalendarModal({ onClose, onSuccess }) {
  const { user } = useContext(UserContext);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [cultures, setCultures] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState({ lat: 4.05, lng: 11.7, name: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    if (step === 1) {
      axios.get('/api/cultures').then(res => setCultures(res.data));
    }
  }, [step]);

  const handleSubmit = async () => {
    if (!name.trim()) return setError("Le nom du calendrier est requis.");
    if (!selectedCulture) return setError("Veuillez choisir une culture.");
    if (!startDate) return setError("Veuillez choisir une date de début.");
    if (!endDate) return setError("Veuillez choisir une date de fin.");
    if (!location.name.trim()) return setError("Veuillez saisir un lieu.");
    if (!location.lat || !location.lng) return setError("Veuillez sélectionner un point sur la carte.");

    setError('');
    try {
      await axios.post('/api/calendars', {
        name,
        cultureId: selectedCulture,
        startDate,
        endDate,
        locationName: location.name,
        latitude: location.lat,
        longitude: location.lng,
        userId: user.id
      });
      onSuccess && onSuccess();
      onClose();
    } catch (e) {
      setError("Erreur lors de la création du calendrier.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <div
          className="modal-body"
          style={
            step === 3
              ? { padding: 0, height: 400, minHeight: 400 }
              : { padding: "48px 40px 0 40px" }
          }
        >
          {step === 0 && <AddCalendarStepName name={name} setName={setName} />}
          {step === 1 && <AddCalendarStepCulture cultures={cultures} selectedCulture={selectedCulture} setSelectedCulture={setSelectedCulture} />}
          {step === 2 && <AddCalendarStepDates startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />}
          {step === 3 && <AddCalendarStepLocation location={location} setLocation={setLocation} />}
          {step === 4 && <AddCalendarStepSummary name={name} cultures={cultures} selectedCulture={selectedCulture} startDate={startDate} endDate={endDate} location={location} />}
          {step === 4 && error && (
            <div style={{ color: "#c00", marginTop: 16, fontWeight: 500 }}>
              {error}
            </div>
          )}
        </div>
        <div className="modal-footer">
          <button
            className="modal-btn"
            disabled={step === 0}
            onClick={() => setStep(s => s - 1)}
            style={{ marginRight: 16 }}
          >
            Précédent
          </button>
          {step < steps.length - 1 && (
            <button
              className="modal-btn"
              onClick={() => setStep(s => s + 1)}
            >
              Suivant
            </button>
          )}
          {step === steps.length - 1 && (
            <button
              className="modal-submit"
              onClick={handleSubmit}
            >
              Créer le calendrier
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AddCalendarModal;