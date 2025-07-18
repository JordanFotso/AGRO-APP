#  AGRO-APP

AGRO-APP est une application web fullstack destinée à fournir un **calendrier agricole personnalisé** selon les cultures, avec prise en charge de la **géolocalisation** pour un accès aux données locales.

Ce projet est divisé en deux parties :
- Un **backend** Node.js (Express, Sequelize, MongoDB optionnel)
- Un **frontend** React.js (avec carte, formulaire, UI responsive)

---

##  Structure du projet

```
AGRO-APP/
├── backend/          # API Express + JWT + Sequelize + Tests
│   └── README.md
├── frontend/         # Application React.js
│   └── README.md
└── README.md         # Ce fichier
```

---

##  Lancement rapide 

### 1. Cloner le projet
```bash
git clone https://github.com/JordanFotso/AGRO-APP.git
cd AGRO-APP
```

```

## ⚙️ Démarrage manuel 

### Backend
```bash
cd backend
npm install
cp .env.example .env
npm start
```

### Frontend
```bash
cd frontend
npm install
npm start
```
### 3. Accès aux services

- Backend : http://localhost:3001  
- Frontend : http://localhost:3000

---

##  Documentation

-  [Backend API - Express](./backend/README.md)
-  [Frontend - React](./frontend/README.md)

---

##  Auteur

Développé par **FOTSO BOPDA Achille Jordan**  
🔗 [GitHub](https://github.com/JordanFotso)

---

