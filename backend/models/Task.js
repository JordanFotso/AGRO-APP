module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    date: DataTypes.DATE,
    status: DataTypes.STRING,
  });
  Task.associate = models => {
    Task.belongsTo(models.Calendar, { foreignKey: 'calendarId' });
  };
  return Task;
};