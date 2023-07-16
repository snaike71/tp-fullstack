# tp-fullstack


## Description
***
Application simple permettant d'enregistrer dans une base de données mongoDB  
des notations de films. Ce projet est constitué d'une API Rest réalisée avec  
Node.js/Express.js et un frontend réalisée avec Vue.js.
***
## Installation
***
Après avoir cloné le projet, un fichier .env doit être ajouté à la racine du  
projet (nécessaire pour docker) pour y noter l'URI de la base de donné (format  
dans le fichier .env.example).

### backend 
```
$ cd backend
$ npm run start
```

### frontend
```
$ cd frontend
$ npm run dev
```

***
## Docker
***
Pour deployer le projet sous docker, vous devez effectuer la commande suivante  
à la racine du projet :
```
$ docker-compose up
```
Les images seront créées et des conteneurs basés sur ces images seront également
créés et lancés.
***





