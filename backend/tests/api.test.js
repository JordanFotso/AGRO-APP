require('dotenv').config(); // <-- Ajoute cette ligne tout en haut
const request = require('supertest');
const { sequelize, User, Culture, Calendar, Task } = require('../models');
const express = require('express');
const cors = require('cors');

// On importe les routes comme dans server.js
const userRoutes = require('../routes/user');
const cultureRoutes = require('../routes/culture');
const calendarRoutes = require('../routes/calendar');
const taskRoutes = require('../routes/task');
const authRoutes = require('../routes/auth');

// On crée une app Express pour les tests
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/cultures', cultureRoutes);
app.use('/api/calendars', calendarRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

jest.setTimeout(30000); // 30 secondes

describe('API AgroApp', () => {
  let userId, cultureId, calendarId, taskId;
  let token;

  // USER
  test('Create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Jordan', email: 'jordan@test.com', password: 'pass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Jordan');
    userId = res.body.id;
  });

  test('Login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'jordan@test.com', password: 'pass' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe('jordan@test.com');
    token = res.body.token;
  });


  // CULTURE
  test('Create culture', async () => {
    const res = await request(app)
      .post('/api/cultures')
      .send({ name: 'Maïs', description: 'Culture de maïs' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Maïs');
    cultureId = res.body.id;
  });

  test('Get cultures', async () => {
    const res = await request(app).get('/api/cultures');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // CALENDAR
  test('Create calendar', async () => {
    const res = await request(app)
      .post('/api/calendars')
      .send({
        name: 'Maïs 2025',
        startDate: '2025-03-01',
        endDate: '2025-09-01',
        locationName: 'Douala',
        latitude: 4.05,
        longitude: 11.7,
        userId,
        cultureId
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Maïs 2025');
    expect(res.body.locationName).toBe('Douala');
    calendarId = res.body.id;
  });

  test('Get calendars', async () => {
    const res = await request(app).get('/api/calendars');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body[0].locationName).toBe('Douala');
  });

  // TASK
  test('Create task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({
        title: 'Semis',
        description: 'Semer le maïs',
        date: '2025-03-05',
        status: 'à faire',
        calendarId
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Semis');
    taskId = res.body.id;
  });

  test('Get tasks', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  // UPDATE & DELETE
  test('Update user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Jordan43' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Jordan43');
  });

  test('Delete task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task deleted');
  });
});