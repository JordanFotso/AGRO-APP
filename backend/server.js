// filepath: /home/jordan43/Bureau/projet/html & css & javascript/agro-app/backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

// TODO: importer et utiliser tes routes ici
const userRoutes = require('./routes/user');
const cultureRoutes = require('./routes/culture');
const calendarRoutes = require('./routes/calendar');
const taskRoutes = require('./routes/task');
const authRoutes = require('./routes/auth');

app.use('/api/users', userRoutes);
app.use('/api/cultures', cultureRoutes);
app.use('/api/calendars', calendarRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log('API AgroApp démarrée sur le port', PORT);
  });
}).catch(err => {
  console.error('Erreur de connexion à la base:', err);
});