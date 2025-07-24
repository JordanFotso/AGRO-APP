import React, { useState } from "react";
import './AddCalendarModal.css';

function CalendrierDayModal({ date, tasks, calendars = [], onClose }) {
  const [selectedTask, setSelectedTask] = useState(null);

  // Tâches du jour
  const dayTasks = tasks.filter(
    t => t.date && t.date.slice(0, 10) === date
  );

  // Événements de début/fin de plantation
  const calendarEvents = calendars.flatMap(cal => {
    const events = [];
    if (cal.startDate && cal.startDate.slice(0, 10) === date) {
      events.push({
        id: `start-${cal.id}`,
        title: `Début de plantation`,
        description: cal.Culture?.name ? `Culture : ${cal.Culture.name}` : "",
        status: "Début",
        isEvent: true,
        calendarName: cal.name
      });
    }
    if (cal.endDate && cal.endDate.slice(0, 10) === date) {
      events.push({
        id: `end-${cal.id}`,
        title: `Fin de plantation`,
        description: cal.Culture?.name ? `Culture : ${cal.Culture.name}` : "",
        status: "Fin",
        isEvent: true,
        calendarName: cal.name
      });
    }
    return events;
  });

  // Fusionne tâches et événements spéciaux
  const allItems = [
    ...calendarEvents,
    ...dayTasks.map(t => ({
      ...t,
      isEvent: false,
      calendarName: calendars.find(cal => cal.id === t.calendarId)?.name
    }))
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{
          minWidth: 340,
          maxWidth: 700,
          minHeight: 340,
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          display: "flex",
          flexDirection: "row"
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Liste des tâches et événements */}
        <div style={{ flex: 1, minWidth: 0, padding: "32px 32px 32px 40px" }}>
          <button
            className="modal-close"
            onClick={onClose}
            style={{ position: "absolute", top: 18, right: 24, fontSize: 28 }}
          >×</button>
          <h3 style={{ color: "#009688", marginBottom: 18 }}>
            Tâches et événements du {date}
          </h3>
          {allItems.length === 0 ? (
            <div style={{ color: "#888", marginTop: 24 }}>Aucune tâche ou événement pour ce jour.</div>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {allItems.map(item => (
                <li key={item.id} style={{ marginBottom: 12 }}>
                  <button
                    style={{
                      background: item.isEvent ? "#fff3e0" : "#e0f7fa",
                      border: "none",
                      borderRadius: 6,
                      padding: "8px 14px",
                      color: item.isEvent ? "#ff9800" : "#009688",
                      fontWeight: 600,
                      fontSize: "1em",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      gap: 8
                    }}
                    onClick={() => setSelectedTask(item)}
                  >
                    {item.isEvent && (
                      <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#ff9800" }}>
                        event
                      </span>
                    )}
                    {item.title}
                    {item.calendarName && (
                      <span style={{ marginLeft: 8, color: "#888", fontWeight: 400, fontSize: "0.97em" }}>
                        ({item.calendarName})
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Détail tâche/événement à droite */}
        {selectedTask && (
          <div
            style={{
              background: "#f6f8fa",
              borderRadius: "0 16px 16px 0",
              boxShadow: "-2px 0 12px #00968822",
              padding: "32px 24px",
              minWidth: 240,
              maxWidth: 300,
              marginLeft: 18,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <h4 style={{ color: "#009688", marginTop: 0 }}>{selectedTask.title}</h4>
            <div style={{ marginBottom: 8 }}>
              <b>Plantation :</b><br />
              <span>{selectedTask.calendarName || <i>Non renseigné</i>}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Description :</b><br />
              <span>{selectedTask.description || <i>Pas de description</i>}</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Heure :</b> {selectedTask.hour || <i>Non précisée</i>}
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Status :</b> {selectedTask.status || <i>Non précisé</i>}
            </div>
            <button
              className="modal-close"
              style={{ marginTop: 12, alignSelf: "flex-end", fontSize: 18 }}
              onClick={() => setSelectedTask(null)}
            ></button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CalendrierDayModal;