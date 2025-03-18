#!/bin/bash

cd ../frontend
docker build -t magbox-frontend .

cd ../backend
docker build -t magbox-backend .

cd ../docker
docker compose up -d

cd ../e2e
docker run --rm --name playwright-tests --network magbox-network --env CI=true --entrypoint npx