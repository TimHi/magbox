docker build . -t magbox-backend
docker run -p 127.0.0.1:8090:8090/tcp magbox-backend