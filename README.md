# Magbox

Magbox is a website to store links you plan to read later or save for future reference. Like bookmarks but (a bit) better.

[![build-and-deploy-container](https://github.com/TimHi/magbox/actions/workflows/build-container.yaml/badge.svg)](https://github.com/TimHi/magbox/actions/workflows/build-container.yaml)  
[![build and lint](https://github.com/TimHi/magbox/actions/workflows/lint.yaml/badge.svg)](https://github.com/TimHi/magbox/actions/workflows/lint.yaml)  

## Development

Run the backend:

```bash
go run main.go serve --http="localhost:9000"
```

Run the frontend:

```bash
npm run dev
```

## e2e

From `docker` folder start backend and frontend containers, then run the playwright e2e tests.
(Only tested on Windows so far):
```bash
$env:MODE="development"; docker-compose up --build
``` 

From `e2e` folder start the tests locally using `npx playwright test` or:
```bash
docker run --rm --name playwright-tests --network docker_magbox-network --env CI=true -v "${PWD}:/workspace" -w /workspace --entrypoint npx mcr.microsoft.com/playwright:v1.51.1-jammy playwright test
```
