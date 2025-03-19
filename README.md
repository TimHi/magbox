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

From `docker` folder start backend and frontend containers:
(Only tested on Windows so far)
```bash
$env:MODE="development"; docker-compose up --build
```
