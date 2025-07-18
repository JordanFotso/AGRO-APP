const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT, // <-- AJOUTE CETTE LIGNE
  logging: false
});

const models = {
  User: require('./User')(sequelize, DataTypes),
  Culture: require('./Culture')(sequelize, DataTypes),
  Calendar: require('./Calendar')(sequelize, DataTypes),
  Task: require('./Task')(sequelize, DataTypes),
};

Object.values(models).forEach(model => {
  if (model.associate) model.associate(models);
});

module.exports = { sequelize, ...models };