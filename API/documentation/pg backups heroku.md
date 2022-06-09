Pour plannifier un backup journalier:
```
heroku pg:backups:schedule --at '04:00 Europe/Paris' --app cinevoraces-api
```