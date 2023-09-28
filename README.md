# Magbox

Magbox is a website to store links you plan to read later or save for future reference. Like bookmarks but (a bit) better.

[![build-and-deploy-container](https://github.com/TimHi/magbox/actions/workflows/build-container.yaml/badge.svg)](https://github.com/TimHi/magbox/actions/workflows/build-container.yaml)  
[![build and lint](https://github.com/TimHi/magbox/actions/workflows/lint.yaml/badge.svg)](https://github.com/TimHi/magbox/actions/workflows/lint.yaml)  
[![run e2e tests](https://github.com/TimHi/magbox/actions/workflows/playwright.yml/badge.svg)](https://github.com/TimHi/magbox/actions/workflows/playwright.yml)

## Development

Run the backend:

```bash
go run main.go serve --http="localhost:9000"
```

Run the frontend:

```bash
npm run dev
```

Visit [http://localhost:5173/](http://localhost:5173/)

## E2E

Currently the e2e setup is beyond subpar. After making changes you need to run `npm run build:test`.
