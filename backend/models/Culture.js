module.exports = (sequelize, DataTypes) => {
  const Culture = sequelize.define('Culture', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  });
  Culture.associate = models => {
    Culture.hasMany(models.Calendar, { foreignKey: 'cultureId' });
  };
  return Culture;
};