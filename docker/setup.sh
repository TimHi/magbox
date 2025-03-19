#!/bin/bash

cd ../frontend
docker build -t magbox-frontend  --build-arg VITE_ENV=development .

cd ../backend
docker build -t magbox-backend .

cd ../docker
$env:MODE="development"; docker-compose up --build -d

