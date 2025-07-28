import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CultureCard from './CultureCard';
import AddCultureCard from './AddCultureCard';
import CultureInfo from './CultureInfo';
import { UserContext } from '../UserContext';
import AddCalendarModal from './AddCalendarModal';
import './AgroPage.css'; // Import du CSS modernisé

// Nouveau composant pour l'état vide
const Placeholder = () => (
  <div className="placeholder-container fade-in">
    <span className="material-symbols-outlined placeholder-icon">grass</span>
    <p className="placeholder-text">Sélectionnez une culture pour afficher ses détails.</p>
  </div>
);

function Cultures() {
  const { user } = useContext(UserContext);
  const [calendars, setCalendars] = useState([]);
  const [selectedCalendar, setSelectedCalendar] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [showCultureInfo, setShowCultureInfo] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) return;
    axios.get('/api/calendars')
      .then(res => {
        setCalendars(res.data.filter(cal => cal.userId === user.id && cal.Culture));
      });
  }, [user]);

  useEffect(() => {
    if (selectedCalendar) {
      axios.get(`/api/tasks?calendarId=${selectedCalendar.id}`)
        .then(res => setTasks(res.data));
      setShowCultureInfo(false); // Réinitialise la vue à chaque changement
    }
  }, [selectedCalendar]);

  const handleSelectCalendar = (calendar) => {
    setSelectedCalendar(null); // Force le re-rendu pour l'animation
    setTimeout(() => setSelectedCalendar(calendar), 50); // Applique le nouveau calendrier après un court délai
  };

  return (
    <div className="agro-page-container">
      <h2 className="agro-page-title">Mes Cultures</h2>
      
      <div className="cultures-grid">
        {calendars.map(cal => (
          <CultureCard
            key={cal.id}
            name={cal.name}
            onClick={() => handleSelectCalendar(cal)}
            selected={selectedCalendar?.id === cal.id}
          />
        ))}
        <AddCultureCard onClick={() => setShowModal(true)} />
      </div>

      {showModal && (
        <AddCalendarModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {/* Logique de rechargement */}}
        />
      )}

      {!selectedCalendar ? (
        <Placeholder />
      ) : (
        <div className="agro-content-grid fade-in">
          <div className="details-card">
            <div className="details-header">
              <h3>{selectedCalendar.name}</h3>
            </div>
            <ul className="details-list">
              <li className="detail-item">
                <strong>Culture</strong>
                <span className="culture-link" onClick={() => setShowCultureInfo(true)} title="Voir les infos sur cette culture">
                  {selectedCalendar.Culture.name}
                </span>
              </li>
              <li className="detail-item">
                <strong>Période</strong>
                <span>{new Date(selectedCalendar.startDate).toLocaleDateString('fr-FR')} → {new Date(selectedCalendar.endDate).toLocaleDateString('fr-FR')}</span>
              </li>
              <li className="detail-item">
                <strong>Lieu</strong>
                <span>{selectedCalendar.locationName}</span>
              </li>
            </ul>

            <div className="tasks-section">
              <h4 className="tasks-section-title">Tâches Associées</h4>
              {tasks.length === 0 ? (
                <p>Aucune tâche planifiée pour ce calendrier.</p>
              ) : (
                <ul className="agro-task-list">
                  {tasks.map(task => (
                    <li key={task.id} className="agro-task-item">
                      <span className="task-title">{task.title}</span>
                      <span className="task-details">
                        {new Date(task.date).toLocaleDateString('fr-FR')} <br/> <i>{task.status}</i>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {showCultureInfo && (
            <div className="fade-in">
              <CultureInfo
                cultureId={selectedCalendar.Culture.id}
                onClose={() => setShowCultureInfo(false)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Cultures;