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
sqitch target add heroku-dev postgres://wvyaokmadqitiz:d3fed6e760dff71069bc52d25db2f326255f3a6417387bb9b25340ad4ae5bae1@ec2-34-246-227-219.eu-west-1.compute.amazonaws.com:5432/dcg6dkbn63948s
```