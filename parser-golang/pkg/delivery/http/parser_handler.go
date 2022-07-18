package http

import (
	"github.com/gin-gonic/gin"
	"parser-golang/config"
	"parser-golang/pkg/domain"
)

// ResponseError represent the response error struct
type ResponseError struct {
	Message string `json:"message"`
}

// ParserHandler represent the http handler for parser microservice
type ParserHandler struct {
	pUsecase domain.ParserUsecase
	nUsecase domain.NeuralUsecase
}

// NewParserHandler will initialize the parser resources endpoint
func NewParserHandler(server *gin.Engine, p domain.ParserUsecase, n domain.NeuralUsecase) {
	handler := &ParserHandler{
		pUsecase: p,
		nUsecase: n,
	}
	server.POST("/process-news", handler.ProcessNews)
}

func (p *ParserHandler) ProcessNews(ctx *gin.Context) {
	request := new(domain.RequestParameters)

	if err := ctx.BindJSON(request); err != nil {
		ctx.JSON(500, ResponseError{err.Error()})
		return
	}

	parsedData, err := p.pUsecase.ParseNews(request)
	if err != nil {
		ctx.JSON(500, ResponseError{err.Error()})
		return
	}

	neuralText, err := p.nUsecase.ProcessNews(
		config.GetConfig().NeuralUrl,
		parsedData,
	)
	if err != nil {
		ctx.JSON(500, ResponseError{err.Error()})
		return
	}

	ctx.JSON(200, neuralText)
}
