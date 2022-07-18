package utils

import (
	"io/ioutil"
	"log"
	"os"
)

func PrintTitle() {
	header, err := os.Open("pkg/utils/header/header.txt")
	if err != nil {
		log.Println("Error to load header! ", err)
	} else {
		text, _ := ioutil.ReadAll(header)
		log.Print(string(text))
	}
}
