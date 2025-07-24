import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import CultureCard from './CultureCard';
import AddCultureCard from './AddCultureCard';
import CultureInfo from './CultureInfo';
import { UserContext } from '../UserContext';
import AddCalendarModal from './AddCalendarModal';
import './AgroPage.css';

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
    if (!selectedCalendar) return;
    axios.get('/api/tasks')
      .then(res => {
        setTasks(res.data.filter(task => task.calendarId === selectedCalendar.id));
      });
    setShowCultureInfo(false); // reset culture info on calendar change
  }, [selectedCalendar]);

  return (
    <div className="agro-page-container">
      <h2 className="agro-page-title">Mes cultures en cours</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {calendars.map(cal => (
          <CultureCard
            key={cal.id}
            name={cal.Culture.name}
            onClick={() => setSelectedCalendar(cal)}
            selected={selectedCalendar && selectedCalendar.id === cal.id}
          />
        ))}
        <AddCultureCard onClick={() => setShowModal(true)} />
      </div>

      {showModal && (
        <AddCalendarModal
          onClose={() => setShowModal(false)}
          onSuccess={() => {/* recharger la liste si besoin */}}
        />
      )}

      {selectedCalendar && (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            marginTop: 32,
            gap: 0
          }}
        >
          {/* Description et détails à gauche */}
          <div className="agro-card" style={{minWidth: 320, maxWidth: 420, flex: "0 0 350px"}}>
            <h3 style={{ color: "#009688", marginBottom: 12 }}>
              {selectedCalendar.name}
            </h3>
            <div style={{ marginBottom: 8 }}>
              <b>Culture :</b>{" "}
              <span
                style={{
                  color: "#009688",
                  textDecoration: "underline",
                  cursor: "pointer",
                  fontWeight: 600
                }}
                onClick={() => setShowCultureInfo(true)}
                title="Voir les infos sur cette culture"
              >
                {selectedCalendar.Culture.name}
              </span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Description :</b> {selectedCalendar.Culture.description}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Période :</b> {selectedCalendar.startDate?.slice(0, 10)} → {selectedCalendar.endDate?.slice(0, 10)}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Lieu :</b> {selectedCalendar.locationName}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Coordonnées :</b> {selectedCalendar.latitude}, {selectedCalendar.longitude}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Utilisateur :</b> {user.name}
            </div>
            <div style={{ marginTop: 18 }}>
              <b style={{ fontSize: "1.1em" }}>Tâches associées :</b>
              {tasks.length === 0 ? (
                <div style={{ color: "#888", marginTop: 6 }}>Aucune tâche pour ce calendrier.</div>
              ) : (
                <ul className="agro-task-list">
                  {tasks.map(task => (
                    <li
                      key={task.id}
                      className="agro-task-item"
                    >
                      <span style={{ fontWeight: 600 }}>{task.title}</span>
                      <span style={{ fontSize: "0.95em", color: "#555" }}>
                        {task.date?.slice(0, 10)} — <i>{task.status}</i>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* CultureInfo à droite de la description */}
          {showCultureInfo && (
            <CultureInfo
              cultureId={selectedCalendar.Culture.id}
              onClose={() => setShowCultureInfo(false)}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Cultures;