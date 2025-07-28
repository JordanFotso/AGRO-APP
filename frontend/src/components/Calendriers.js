import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../UserContext';
import axios from 'axios';
import './Calendriers.css'; // On utilise notre nouveau CSS
import CalendrierDayModal from "./CalendrierDayModal";

const monthNames = [ "Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ];

function Calendriers() {
  const { user } = useContext(UserContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);
  const [calendars, setCalendars] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  useEffect(() => {
    if (!user) return;
    const fetchAllData = async () => {
      // On utilise Promise.all pour des appels plus propres
      const [tasksRes, calendarsRes] = await Promise.all([
        axios.get('/api/tasks?userId=' + user.id),
        axios.get('/api/calendars?userId=' + user.id)
      ]);
      setTasks(tasksRes.data);
      setCalendars(calendarsRes.data);
    };
    fetchAllData();
  }, [user]);

  const handleMonthChange = (offset) => {
    setCurrentDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setMonth(newDate.getMonth() + offset);
      return newDate;
    });
  };

  const renderCells = () => {
    const today = new Date();
    today.setHours(0,0,0,0); // Normalise pour la comparaison
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const offset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1);
    
    const rows = [];
    let cells = [];

    for (let i = 0; i < offset; i++) {
      cells.push(<td key={`empty-${i}`} className="calendar-cell empty"></td>);
    }

    for (let dayNum = 1; dayNum <= daysInMonth; dayNum++) {
      const cellDate = new Date(currentYear, currentMonth, dayNum);
      const dateStr = cellDate.toISOString().slice(0, 10);
      
      const dayTasks = tasks.filter(t => t.date?.slice(0, 10) === dateStr);
      const dayCultures = calendars.filter(c => dateStr >= c.startDate?.slice(0, 10) && dateStr <= c.endDate?.slice(0, 10));
      
      const isToday = cellDate.getTime() === today.getTime();
      const isPast = cellDate < today;

      cells.push(
        <td 
          key={dateStr}
          className={`calendar-cell ${isToday ? 'is-today' : ''} ${isPast ? 'is-past-day' : ''}`}
          onClick={() => setSelectedDate(dateStr)}
        >
          <div className="day-number">{dayNum}</div>
          <div className="events-container">
            {dayCultures.slice(0, 1).map(culture => (
              <div key={`culture-${culture.id}`} className="event-pill is-culture">
                {culture.name}
              </div>
            ))}
             {dayTasks.slice(0, 1).map(task => (
              <div key={`task-${task.id}`} className="event-pill is-task">
                {task.title}
              </div>
            ))}
            {/* On peut ajouter une logique pour "+ X de plus" si nécessaire */}
          </div>
        </td>
      );
      
      if (cells.length === 7 || dayNum === daysInMonth) {
        rows.push(<tr key={`week-${rows.length}`}>{cells}</tr>);
        cells = [];
      }
    }
    return rows;
  };

  return (
    <div className="calendar-container" >
      <div className="calendar-header">
        <button onClick={() => handleMonthChange(-1)} className="calendar-nav-btn">‹</button>
        <h2 className="calendar-title">{monthNames[currentMonth]} {currentYear}</h2>
        <button onClick={() => handleMonthChange(1)} className="calendar-nav-btn">›</button>
      </div>

      <table className="calendar-grid">
        <thead>
          <tr>
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(j => <th key={j}>{j}</th>)}
          </tr>
        </thead>
        <tbody>
          {renderCells()}
        </tbody>
      </table>

      {selectedDate && (
        <CalendrierDayModal
          date={selectedDate}
          tasks={tasks.filter(t => t.date?.slice(0, 10) === selectedDate)}
          calendars={calendars} // La modale peut filtrer elle-même si besoin
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}

export default Calendriers;