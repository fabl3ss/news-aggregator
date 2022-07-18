FROM golang:latest

LABEL mainteiner="auth"

WORKDIR /auth

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o main cmd/main.go

RUN find . -name "*.go" -type f -delete

CMD ["./main"]