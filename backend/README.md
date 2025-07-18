#  Backend - AGRO-APP

Ce backend fournit une API REST pour la gestion d’un calendrier agricole personnalisé. Il utilise **Express**, **Sequelize (MySQL)** et **JWT** pour l'authentification.

---

## Technologies utilisées

- **Node.js** / **Express.js**
- **Sequelize** (ORM pour MySQL)
- **JWT** pour l’authentification
- **Bcrypt.js** pour le hachage des mots de passe
- **Dotenv** pour la configuration
- **Jest** et **Supertest** pour les tests

---

## 📂 Structure du projet

```
backend/
├── server.js             # Point d’entrée du serveur
├── routes/               # Routes de l'API
├── controllers/          # Logique métier
├── models/               # Modèles Sequelize 
├── middlewares/          # Auth, erreurs, etc.
├── config/               # Connexion DB et autres configs
├── tests/                # Tests unitaires / d'intégration
├── .env                  # (à ne pas versionner)
└── .env.example          # Exemple de fichier d’environnement
```

---

## ⚙️ Installation

### 1. Cloner le projet
```bash
git clone https://github.com/JordanFotso/AGRO-APP.git
cd AGRO-APP/backend
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer l’environnement

Copier le fichier `.env.exemple` vers `.env` :
```bash
cp .env.exemple .env
```

Exemple de contenu du `.env` :

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=agro_app
DB_PORT=3307
JWT_SECRET=superAlias
JWT_REFRESH_SECRET=superAlias2
```

---

##  Lancer le serveur

```bash
npm start
```

Le serveur démarre sur [http://localhost:3001](http://localhost:3001)

---

##  Lancer les tests

```bash
npm test
```

Utilise **Jest** et **Supertest** pour tester l'API.

---

##  Sécurité

- Fournir un fichier `.env.example` pour aider les autres à configurer l’environnement local.

---

##  Docker

Ce projet est conçu pour fonctionner avec Docker. Un fichier `docker-compose.yml` est présent à la racine du projet (`AGRO-APP/`) pour faciliter l’orchestration des services (API, base de données, etc.).

---

##  Notes supplémentaires

- Ce backend est destiné à fonctionner avec le frontend React situé dans le dossier `frontend/`.
- Les routes et fonctionnalités peuvent être étendues selon les besoins.

---

##  Auteur

FOTSO BOPDA Achille Jordan  
🔗 [GitHub](https://github.com/JordanFotso)