SERVICE="express-app"
NETWORK="127.0.0.1:8505:8500"
VERSION=`date +%Y%m%d`-1 

logs:
	sudo docker logs ${SERVICE} 2>&1

stats:
	sudo docker stats ${SERVICE}

restart:
	sudo docker restart ${SERVICE}

deploy:
	sudo docker build -t ${SERVICE}:${VERSION} .
	-sudo docker stop ${SERVICE} 
	-sudo docker rm ${SERVICE}
	sudo docker run --log-opt max-size=10m --log-opt max-file=10 --name ${SERVICE} -d --restart=always -p ${NETWORK} ${SERVICE}:${VERSION} 

