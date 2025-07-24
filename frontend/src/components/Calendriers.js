import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import './AgroPage.css';
import './Calendrier.css';
import CalendrierDayModal from "./CalendrierDayModal";

const monthNames = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function isInCulturePeriod(dateStr, cultures) {
  return cultures.some(c =>
    dateStr >= c.startDate && dateStr <= c.endDate
  );
}

function Calendriers() {
  const { user } = useContext(UserContext);
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [tasks, setTasks] = useState([]);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [cultures, setCultures] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [calendars, setCalendars] = useState([]); // État pour les calendriers

  useEffect(() => {
    if (user) {
      axios.get('/api/tasks?userId=' + user.id)
        .then(res => setTasks(res.data));
    }
  }, [user]);

  // Charge les cultures de l'utilisateur (exemple API)
  useEffect(() => {
    if (user) {
      axios.get('/api/cultures?userId=' + user.id)
        .then(res => setCultures(res.data));
    }
  }, [user]);

  // Charge les calendriers de l'utilisateur (exemple API)
  useEffect(() => {
    if (user) {
      axios.get('/api/calendars?userId=' + user.id)
        .then(res => setCalendars(res.data));
    }
  }, [user]);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = new Date(currentYear, currentMonth, 1).getDay(); // 0=dimanche

  // Pour commencer le calendrier au lundi
  const offset = (firstDay === 0 ? 6 : firstDay - 1);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  return (
    <div className="agro-page-container">
      <div className="agro-card" style={{ maxWidth: 1100 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <button onClick={handlePrevMonth} className="calendrier-header-btn">←</button>
          <h2 className="agro-page-title" style={{ margin: 0 }}>{monthNames[currentMonth]} {currentYear}</h2>
          <button onClick={handleNextMonth} className="calendrier-header-btn">→</button>
        </div>
        <table className="calendrier-table">
          <thead>
            <tr>
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(j => (
                <th key={j}>{j}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil((daysInMonth + offset) / 7) }).map((_, weekIdx) => (
              <tr key={weekIdx}>
                {Array.from({ length: 7 }).map((_, dayIdx) => {
                  const dayNum = weekIdx * 7 + dayIdx - offset + 1;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayTasks = tasks
                    .filter(t => t.date && t.date.slice(0, 10) === dateStr)
                    .sort((a, b) => {
                      if (!a.hour && !b.hour) return 0;
                      if (!a.hour) return 1;
                      if (!b.hour) return -1;
                      return a.hour.localeCompare(b.hour);
                    });
                  const isToday = dayNum === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
                  const cellColor =
                    dayTasks.length === 0
                      ? ""
                      : dayTasks.length === 1
                      ? "cell-task-low"
                      : dayTasks.length === 2
                      ? "cell-task-medium"
                      : "cell-task-high";
                  const isCulturePeriod = isInCulturePeriod(dateStr, cultures);
                  return (
                    <td
                      key={dayIdx}
                      className={`calendrier-cell${isToday ? " today" : ""} ${cellColor} ${isCulturePeriod ? "cell-culture-period" : ""}`}
                      onClick={() => dayNum > 0 && dayNum <= daysInMonth && setSelectedDate(dateStr)}
                      style={{ position: "relative" }}
                    >
                      {dayNum > 0 && dayNum <= daysInMonth && (
                        <>
                          <div className={`agro-calendar-day${isToday ? " today" : ""}`}>
                            <div className={`calendrier-daynum${isToday ? " today" : ""}`}>
                              {dayNum}
                              {/* Widget pour date de début ou de fin de calendar */}
                              {calendars.some(cal =>
                                (cal.startDate && cal.startDate.slice(0, 10) === dateStr) ||
                                (cal.endDate && cal.endDate.slice(0, 10) === dateStr)
                              ) && (
                                <span
                                  className="material-symbols-outlined calendrier-calendar-widget"
                                  title="Début ou fin de plantation"
                                  style={{
                                    fontSize: 18,
                                    color: "#ff9800",
                                    verticalAlign: "middle",
                                    marginLeft: 4
                                  }}
                                >
                                  event
                                </span>
                              )}
                              {dayTasks.length > 0 && (
                                <span
                                  className="material-symbols-outlined calendrier-calendar-widget"
                                  title="Tâches présentes"
                                  style={{
                                    fontSize: 18,
                                    color: "#009688",
                                    verticalAlign: "middle",
                                    marginLeft: 4
                                  }}
                                >
                                  event
                                </span>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {selectedDate && (
          <CalendrierDayModal
            date={selectedDate}
            tasks={tasks}
            calendars={calendars}
            onClose={() => setSelectedDate(null)}
          />
        )}
      </div>
    </div>
  );
}

export default Calendriers;