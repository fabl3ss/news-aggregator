package httpserver

import (
	"parser-golang/config"
	"parser-golang/middlewares"
	delivery "parser-golang/pkg/delivery/http"
	"parser-golang/pkg/repository"
	"parser-golang/pkg/usecase"
	"parser-golang/pkg/utils"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Server struct {
	engine *gin.Engine
}

func NewServer() *Server {
	return &Server{}
}

func (s *Server) Init() error {
	s.engine = gin.Default()
	s.engine.Use(
		gin.Recovery(),
		middlewares.Logger(),
		cors.Default(),
	)

	cfg := config.GetConfig()

	middlewares.SetupLogOutput(cfg.LogsDirectory)

	// Print program
	utils.PrintTitle()

	parserRepo := repository.ParserRepository{}
	neuralRepo := repository.NeuralRepository{}

	parserUsecase := usecase.NewParserUsecase(&parserRepo)
	neuralUsecase := usecase.NewNeuralUsecase(&neuralRepo)

	delivery.NewParserHandler(s.engine, parserUsecase, neuralUsecase)

	return s.engine.Run(cfg.ServerPort)
}
