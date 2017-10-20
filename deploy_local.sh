#!/usr/bin/env bash


NAME=morgarothfrontend

VERSION=$(jq -r ".version" package.json)

docker build -t ${NAME}:latest -t ${NAME}:v${VERSION} .

echo "Deploying version $VERSION"
A=`docker inspect -f {{.State.Running}} ${NAME}`
B=`docker inspect -f {{.State}} ${NAME}`
echo "'$A' '$B' '$?'"
if [ "$A" = "true" ]; then
    echo "Docker $NAME is running, killing them..."
    docker kill ${NAME}
else
    echo "Docker $NAME not found."
fi
sleep 3
if [ "$B" != "" ]; then
    echo "Docker $NAME exists, removing them..."
    docker rm ${NAME}
else
    echo "Docker $NAME not found."
fi

docker run --detach \
            --restart=always \
            --name ${NAME} \
            --publish 8880:5000 \
            --expose 8880 \
            ${NAME}

echo "Docker fired!"