#!/bin/bash

cd ../frontend
docker build -t magbox-frontend  --build-arg VITE_ENV=test .

cd ../backend
docker build -t magbox-backend .

cd ../docker
$env:MODE="test"; docker-compose up --build -d

