# Ajouter un nouveau superuser chargé dans le terminal pour pg

## Ajouter un nouvel user en paramètre de la console
```
nano ~/.bashrc
```
Ajouter la ligne :
```
export PGUSER=newuser
```
## Pour charger le user en mémoire
```
source .bashrc
```
## Vérification de la présence de la variable en mémoire
```
echo $PGUSER
```
Doit renvoyer
```
newuser
```
## Emplacement de pg_hba.conf :
```
/opt/homebrew/var/postgres
```
## Modifier le fichier
```
nano pg_hba.conf
```
Sous la ligne
```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
```
Ajouter la ligne
```
local    all            newuser                                 trust
```