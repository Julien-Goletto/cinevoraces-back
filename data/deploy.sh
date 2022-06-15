# Deploy script example
# Do not forget to make it executable with chmod +x

# createuser cinevoraces
# createdb cinevoraces -O cinevoraces 
export PGUSER=cinevoraces
export PGPASSWORD=cinevoraces
export PGDATABASE=cinevoraces

# sqitch init cinevoraces --engine pg

# sqitch add version_1 -n "structure de bdd"
# sqitch add version_2 -n "Création fonction ajout film"
# sqitch add version_3 -n "Création des vues"
# sqitch add version_4 -n "Seeding données réelles"
# sqitch add version_5 -n "Ajout des fonctions de maj updated_at"
# sqitch add version_6 -n "Ajout des index"
# sqitch add version_7 -n "Seeding for tests"
# sqitch add version_8 -n "modification de la vue filters"

# To revert (each following command can be adressed to a specific version)
sqitch revert db:pg:cinevoraces
# To deploy
sqitch deploy db:pg:cinevoraces
# To verify
# sqitch verify db:pg:cinevoraces