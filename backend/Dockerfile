# syntax=docker/dockerfile:1

FROM golang:1.19
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go build -o main .

EXPOSE 8090

# Run
CMD ["./main", "serve",  "--http=0.0.0.0:8090"]