Pour se connecter à un repo Heroku
```
heroku git:remote -a le-nom-de-votre-app
```

Pour déployer sur Heroku, se placer à la racine du repos et lancer la commande suivante :
```
git subtree push --prefix API heroku master
```

Pour déployer la bdd sur Heroku, se placer dans le dossier data et lancer la commande suivante :
```
sqitch target add heroku-dev postgres://
```