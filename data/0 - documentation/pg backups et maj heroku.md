Pour plannifier un backup journalier:
```
heroku pg:backups:schedule --at '04:00 Europe/Paris' --app cinevoraces-api
```

Pour déployer une modification
```
sqitch deploy version heroku-dev
```
où heroku-dev est le nom de la target de la base ciblée dans le sqitch.conf