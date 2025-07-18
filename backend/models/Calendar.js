module.exports = (sequelize, DataTypes) => {
  const Calendar = sequelize.define('Calendar', {
    name: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    // Ajout de la localisation
    locationName: DataTypes.STRING,      // nom du lieu (ex: "Douala")
    latitude: DataTypes.FLOAT,           // latitude
    longitude: DataTypes.FLOAT           // longitude
  });
  Calendar.associate = models => {
    Calendar.belongsTo(models.User, { foreignKey: 'userId' });
    Calendar.belongsTo(models.Culture, { foreignKey: 'cultureId' });
    Calendar.hasMany(models.Task, { foreignKey: 'calendarId' });
  };
  return Calendar;
};