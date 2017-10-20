#!/usr/bin/env bash


CONTAINER_ID=morgarothfrontend

./deploy_local.sh
docker logs -f ${CONTAINER_ID}