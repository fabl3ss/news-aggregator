package usecase

import (
	"encoding/json"
	"github.com/pkg/errors"
	"parser-golang/pkg/domain"
	"parser-golang/pkg/utils"
	"strings"
)

type neuralUsecase struct {
	repository domain.NeuralRepository
}

// NewNeuralUsecase will create new an neuralUsecase object representation of domain.ArticleUsecase interface
func NewNeuralUsecase(repo domain.NeuralRepository) domain.NeuralUsecase {
	return &neuralUsecase{
		repository: repo,
	}
}

func (n *neuralUsecase) GetTextForNeural(res *domain.ParserResponse) string {
	var request string

	// Remove extra quotes from parser response
	for i := 0; i < len(res.Results); i++ {
		if len(res.Results[i].Description) > len(res.Results[i].Content) {
			request += strings.ReplaceAll(
				res.Results[i].Description, "\"", "")
		} else {
			request += strings.ReplaceAll(
				res.Results[i].Content, "\"", "")
		}
	}
	return request
}

func (n *neuralUsecase) NeuralRequestBody(res *domain.ParserResponse) ([]byte, error) {
	return json.Marshal(
		domain.NeuralRequest{
			Text:      n.GetTextForNeural(res),
			Language:  res.Results[0].Language,
			Sentences: "3",
		},
	)
}

func (n *neuralUsecase) ProcessNews(url string, parsed *domain.ParserResponse) (*domain.NeuralResponse, error) {
	body, err := n.NeuralRequestBody(parsed)
	if err != nil {
		return nil, errors.Wrap(err, utils.GetFunctionName(n.NeuralRequestBody))
	}
	response, err := n.repository.GetNeuralResponse(url, body)
	if err != nil {
		return nil, err
	}
	return response, nil
}
