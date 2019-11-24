# !/bin/bash

# initalize variables
remotePassword="RainMaker"

# update aptitude
# apt-get update

# install sshpass
# apt-get install sshpass -y

# ssh into the remote machine
sshpass -p$2 ssh -o StrictHostKeyChecking=no root@$1 bash -c "'
	cd ./Bodhisattva
	git pull &&
	cd ./Code/Main/
	sh ./Setup/Setup.sh
'"
exit