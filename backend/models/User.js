module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
  });
  User.associate = models => {
    User.hasMany(models.Calendar, { foreignKey: 'userId' });
  };
  return User;
};