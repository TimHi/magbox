#!/bin/bash
#1 - true/false for e2e
cd ../frontend
echo "Build frontend"
docker build -t magbox-frontend --build-arg VITE_ENV=test .

cd ../backend
echo "Build backend"
docker build -t magbox-backend .

cd ../docker
echo "Starting Container"
if [ "$OS" = "Windows_NT" ]; then
  $env:MODE="test"; docker-compose up --build -d
else
  MODE="test" docker-compose up --build -d
fi

if [ "$1" = "true" ]; then
  cd ../e2e
  echo "Starting e2e Tests..."
  rm playwright/.auth
  docker run --rm --name playwright-tests --network docker_magbox-network --env CI=true -v "${PWD}:/workspace" -w /workspace --entrypoint npx mcr.microsoft.com/playwright:v1.51.1-jammy playwright test
fi
