
const { Culture } = require('../models');

exports.getAll = async (req, res) => {
  const cultures = await Culture.findAll();
  res.json(cultures);
};

exports.getOne = async (req, res) => {
  const culture = await Culture.findByPk(req.params.id);
  if (!culture) return res.status(404).json({ error: 'Culture not found' });
  res.json(culture);
};

exports.create = async (req, res) => {
  const { name, description } = req.body;
  const culture = await Culture.create({ name, description });
  res.json(culture);
};

exports.update = async (req, res) => {
  const culture = await Culture.findByPk(req.params.id);
  if (!culture) return res.status(404).json({ error: 'Culture not found' });
  await culture.update(req.body);
  res.json(culture);
};

exports.delete = async (req, res) => {
  const culture = await Culture.findByPk(req.params.id);
  if (!culture) return res.status(404).json({ error: 'Culture not found' });
  await culture.destroy();
  res.json({ message: 'Culture deleted' });
};