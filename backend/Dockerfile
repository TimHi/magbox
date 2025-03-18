FROM golang:1.23
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
COPY e2e_data/ .

RUN go build -o main .

EXPOSE 9000

# Run
CMD ["./main", "serve",  "--http=0.0.0.0:9000"]