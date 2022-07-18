package main

import (
	_ "github.com/joho/godotenv/autoload"
	"log"
	"parser-golang/httpserver"
)

func main() {
	err := httpserver.NewServer().Init()
	if err != nil {
		log.Fatal("Cannot initialize http httpserver ", err)
	}
}
