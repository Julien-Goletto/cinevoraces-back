# Deploy script example
# Do not forget to make it executable with chmod +x

# createuser ludotheque
createdb ludotheque -O ludotheque

# sqitch init ludotheque --engine pg

sqitch add version_1 -n "structure de base"
sqitch add version_2 -n "seeding db"
sqitch add version_3 -n "Seeding test datas"

# To revert (each following command can be adressed to a specific version)
# sqitch revert db:pg:ludotheque
# To deploy
sqitch deploy db:pg:ludotheque
# To verify
# sqitch verify db:pg:ludotheque