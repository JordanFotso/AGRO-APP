const { Task, Calendar } = require('../models');

exports.getAll = async (req, res) => {
  const tasks = await Task.findAll({ include: [Calendar] });
  res.json(tasks);
};

exports.getOne = async (req, res) => {
  const task = await Task.findByPk(req.params.id, { include: [Calendar] });
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};

exports.create = async (req, res) => {
  const { title, description, date, status, calendarId } = req.body;
  const task = await Task.create({ title, description, date, status, calendarId });
  res.json(task);
};

exports.update = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  await task.update(req.body);
  res.json(task);
};

exports.delete = async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  await task.destroy();
  res.json({ message: 'Task deleted' });
};