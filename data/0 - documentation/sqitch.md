# SQITCH

Sqitch est un outil de déploiement pour notre base de données (ici PostgreSQL).

## Initialisation

Pour initialiser notre dossier en tant que projet Sqitch :

```
sqitch init training_API_scripts --engine pg
```

**training_API_scripts** est le nom de notre projet (michelizable).
**pg** est notre moteur de BDD (postgresql).

Une fois cette commande passée, trois dossiers vont être créés :

- deploy : pour les scripts de déploiement
- revert : pour les scripts pour revenir en arrière
- verify : pour les scripts de vérification d'un déploiement

Deux fichiers sont ajoutés :

- sqitch.conf : fichier de configuration
- sqitch.plan : firchier d'informations

## Création d'une version

Pour créer une nouvelle version d'un déploiement/migration :

```
sqitch add version_1 -n "structure de base"
```

**version_1** : c'est le nom de notre version (de notre commit)
**"structure de base"**: c'est les détails associés à la version (message du commit)

Une fois la commande passée, il nous faut remplir les fichiers avec le code correspondant.

## Exécution des scripts

Pour lancer un script de deploiement (dossier deploy) :

```
sqitch deploy db:pg:filmotheque nom_de_la_version
```
Le déploiement effectue le déploiement de toutes les versions jusqu'à la version spécifiée.

---

Pour lancer un script de retour arrière (dossier revert)

```
sqitch revert db:pg:filmotheque nom_de_la_version
```

Le retour arrière se fait jusqu'à la version spécifiée.

---

Pour lancer un script de vérification (dossier verify)

```
sqitch verify db:pg:filmotheque nom_de_la_version
```
La vérification se fait sur toutes les versions jusqu'à la version spécifiée.

---

Dans le cas où on ne spécifie pas de version en utilisatant deploy,revert ou verify, il va tout déployer ou tout annuler à zéro ou tout véfifier.

## Remise à zéro

Il est possible de venir pourrir Sqitch au départ quand on ne le maîtrise pas encore.

Pour revenir dans un état où Sqitch n'est pas installé sans perdre nos scripts, il faut :

- effacer sqitch.plan et sqitch.conf
- supprimer le schéma Sqitch de la BDD (drop cascade)