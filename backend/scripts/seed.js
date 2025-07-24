require('dotenv').config();
const { sequelize, User, Culture, Calendar, Task } = require('../models');
const bcrypt = require('bcryptjs');

async function seed() {
  await sequelize.sync();

  // Supprimer dans l'ordre des dépendances (Tasks -> Calendars -> Cultures -> Users)
  await Task.destroy({ where: {}, force: true });
  await Calendar.destroy({ where: {}, force: true });
  await Culture.destroy({ where: {}, force: true });
  await User.destroy({ where: {}, force: true });

  // Utilisateurs
  const password = await bcrypt.hash('pass', 10);
  const user1 = await User.create({ name: 'Jordan', email: 'jordan@test.com', password });
  const user2 = await User.create({ name: 'Alice', email: 'alice@test.com', password });

  // Cultures
  const riz = await Culture.create({ name: 'Riz', description: "Le riz est une céréale de la famille des Poacées (anciennement graminées), cultivée dans les régions tropicales, subtropicales et tempérées chaudes pour son fruit, ou caryopse, riche en amidon. " });
  const mais = await Culture.create({ name: 'Maïs', description: "Le maïs (Zea mays subsp. mays (autonyme)), couramment appelé blé d’Inde au Canada[1], est une plante herbacée tropicale annuelle de la famille des Poacées (graminées), largement cultivée comme céréale pour ses grains riches en amidon, mais aussi comme plante fourragère. Le terme désigne aussi le grain de maïs lui-même. Bien qu'il soit considéré et cuisiné comme un légume, le maïs est un fruit du fait de son origine botanique[2]. " });

  // Calendriers (liés à user1)
  const cal1 = await Calendar.create({
    name: 'Maïs 2025',
    startDate: '2025-03-01',
    endDate: '2025-09-01',
    locationName: 'Douala',
    latitude: 4.05,
    longitude: 11.7,
    userId: user1.id,
    cultureId: mais.id
  });
  const cal2 = await Calendar.create({
    name: 'Riz 2025',
    startDate: '2025-04-01',
    endDate: '2025-10-01',
    locationName: 'Yaoundé',
    latitude: 3.87,
    longitude: 11.52,
    userId: user1.id,
    cultureId: riz.id
  });

  // Tâches
  await Task.create({
    title: 'Préparation sol',
    description: 'Préparer le sol pour le maïs',
    date: '2025-02-20',
    status: 'à faire',
    calendarId: cal1.id
  });
  await Task.create({
    title: 'Semis riz',
    description: 'Semer le riz',
    date: '2025-04-05',
    status: 'à faire',
    calendarId: cal2.id
  });
  await Task.create({
    title: 'sarclage',
    description: 'remuer le sol',
    date: '2025-04-01',
    status: 'à faire',
    calendarId: cal1.id
  });

  console.log('Seed terminé !');
  process.exit();
}

seed();