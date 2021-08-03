# P7 Groupomania - Créez un réseau social d’entreprise

## Installation

### Front-End

**1.** Tapez `cd frontend` pour se rendre dans le dossier **frontend**

**2.** Tapez `npm install` pour installer les dépendances du **frontend**

**3.** Dans le fichier `package.json `, modifiez le `"scripts"` pour les utilisateurs :
`MAC` : "start": "export PORT=4200 && react-scripts start"
`Linux` : "start": "PORT=3006 react-scripts start"

### Back-End

**1.** `cd backend` pour se rendre dans le dossier **backend**

**2.** `npm install` pour installer les dépendances du **backend**

**3.** Modifiez le fichier `config.json` par vos données de serveur **Mysql**

**4.** Lancez la commande `npx sequelize db:migrate` pour créer les tables **Mysql**

**5.** Renommez le fichier `".env copy"` en `".env"`

## Lancer l'application

Pour lancer l'application :

**1.** Rendez-vous dans le dossier **frontend** puis exécuter la commande `npm start` dans une terminal, une page devrait s'ouvrir sur votre navigateur. Si ce n'est pas le cas, ouvrez l'URL `http://localhost:4200/` dans votre navigateur.

**2.** Rendez-vous dans le dossier **backend** puis exécuter la commande `npm start` dans un terminal.

**IMPORTANT** le frontend s'exécute sur le port 4200 et le backend sur le port 5000, veillez à ce que les deux ports soit disponibles
