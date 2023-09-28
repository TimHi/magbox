#!/usr/bin/env bash
SCRIPT_DIR=`dirname "$BASH_SOURCE"`
cd ${SCRIPT_DIR}

docker compose -p magbox-e2e -f docker-compose-e2e.yaml build