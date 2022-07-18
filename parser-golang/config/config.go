package config

import (
	"os"
	"sync"
)

type Config struct {
	ServerPort     string
	ParserApiToken string
	ParserApiUrl   string
	NeuralUrl      string
	LogsDirectory  string
}

var (
	cfg  Config
	once sync.Once
)

// GetConfig config from environment. Once.
func GetConfig() *Config {
	once.Do(func() {
		cfg = Config{
			ServerPort:     os.Getenv("SERVER_PORT"),
			ParserApiToken: os.Getenv("PARSER_API_TOKEN"),
			ParserApiUrl:   os.Getenv("PARSER_API_URL"),
			NeuralUrl:      os.Getenv("NEURAL_URL"),
			LogsDirectory:  os.Getenv("LOGS_DIR"),
		}
	})
	return &cfg
}
