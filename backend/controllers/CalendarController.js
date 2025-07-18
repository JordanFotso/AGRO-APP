const { Calendar, Task, Culture, User } = require('../models');

exports.getAll = async (req, res) => {
  const calendars = await Calendar.findAll({
    include: [Culture, User, Task]
  });
  res.json(calendars);
};

exports.getOne = async (req, res) => {
  const calendar = await Calendar.findByPk(req.params.id, {
    include: [Culture, User, Task]
  });
  if (!calendar) return res.status(404).json({ error: 'Calendar not found' });
  res.json(calendar);
};

exports.create = async (req, res) => {
  const { name, startDate, endDate, userId, cultureId, locationName, latitude, longitude } = req.body;
  const calendar = await Calendar.create({ name, startDate, endDate, userId, cultureId, locationName, latitude, longitude });
  res.json(calendar);
};

exports.update = async (req, res) => {
  const calendar = await Calendar.findByPk(req.params.id);
  if (!calendar) return res.status(404).json({ error: 'Calendar not found' });
  await calendar.update(req.body);
  res.json(calendar);
};

exports.delete = async (req, res) => {
  const calendar = await Calendar.findByPk(req.params.id);
  if (!calendar) return res.status(404).json({ error: 'Calendar not found' });
  await calendar.destroy();
  res.json({ message: 'Calendar deleted' });
};