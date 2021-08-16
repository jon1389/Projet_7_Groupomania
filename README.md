# P7 Groupomania - Créez un réseau social d’entreprise

## Contexte

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.
Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂
Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

## Mission

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.
Dans cette mission, nous allons développer un réseau social où les employés pourront partager et commenter des images/gifs.

### Exigences émises par le comité de pilotage

- La présentation des fonctionnalités doit être simple ;
- La création d’un compte doit être simple et possible depuis un téléphone mobile ;
- Le profil doit contenir très peu d’informations pour que sa complétion soit rapide ;
- La suppression du compte doit être possible ;
- L’accès à un forum où les salariés publient des contenus multimédias doit être présent ;
- Les utilisateurs doivent pouvoir facilement repérer les dernières participations des employés ;
- Le ou la chargé-e de communication Groupomania doit pouvoir modérer les interactions entre salariés ;

## Technologies utilisées

- Framework backend : Express
- Serveur : NodeJS
- Base de données : MySQL
- ORM : Sequelize
- Framework frontend : ReactJS
- Sass

## Installation

### Front-End

**1.** Ouvrez un terminal et tapez `cd frontend` pour se rendre dans le dossier **frontend**

**2.** Tapez `npm install` pour installer les dépendances du **frontend**

**3.** Dans le fichier `package.json `, modifiez le `"scripts"` pour les utilisateurs :
`MAC` : "start": "export PORT=4200 && react-scripts start"
`Linux` : "start": "PORT=3006 react-scripts start"

### Back-End

**1.** Ouvrez un terminal et tapez `cd backend` pour se rendre dans le dossier **backend**

**2.** Tapez `npm install` pour installer les dépendances du **backend**

**3.** Modifiez le fichier `config.json` par vos données de serveur **Mysql**

**4.** Lancez la commande `npx sequelize db:migrate` pour créer les tables **Mysql**

**5.** Renommez le fichier `".env copy"` en `".env"`

## Lancer l'application

Pour lancer l'application :

**1.** Rendez-vous dans le dossier **frontend** puis exécuter la commande `npm start` dans une terminal, une page devrait s'ouvrir sur votre navigateur. Si ce n'est pas le cas, ouvrez l'URL `http://localhost:4200/` dans votre navigateur.

**2.** Rendez-vous dans le dossier **backend** puis exécuter la commande `npm start` dans un terminal.

**IMPORTANT** le frontend s'exécute sur le port 4200 et le backend sur le port 5000, veillez à ce que les deux ports soit disponibles
