cd ../frontend
docker build -t magbox-frontend .
docker compose up -d
cd ../e2e
docker run --rm --name playwright-tests --network magbox-network --env CI=true --entrypoint npx