docker build -t magbox-frontend .
docker run -it -p 8080:80 --rm --name magbox-frontend magbox-frontend