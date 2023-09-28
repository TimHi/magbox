# syntax=docker/dockerfile:1

FROM golang:1.19
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .

RUN go build -o main .

EXPOSE 9000

# Run
CMD ["./main", "serve",  "--http=0.0.0.0:9000"]