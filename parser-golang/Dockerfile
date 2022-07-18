FROM golang:latest

LABEL mainteiner="parser"

WORKDIR /app

COPY go.mod .

COPY go.sum .

RUN go mod download

COPY . .

RUN go build -o main app/main.go

RUN find . -name "*.go" -type f -delete

CMD ["./main"]