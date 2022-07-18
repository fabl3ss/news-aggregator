package usecase

import (
	"encoding/json"
	"github.com/pkg/errors"
	"parser-golang/pkg/domain"
	"parser-golang/pkg/utils"
)

type parserUsecase struct {
	repository domain.ParserRepository
}

// NewParserUsecase will create new an parserUsecase object representation of domain.ArticleUsecase interface
func NewParserUsecase(repo domain.ParserRepository) domain.ParserUsecase {
	return &parserUsecase{
		repository: repo,
	}
}

func (p *parserUsecase) ParseNews(request *domain.RequestParameters) (*domain.ParserResponse, error) {
	body, err := p.repository.MakeParserRequest(request)
	if err != nil {
		return nil, errors.Wrap(err,
			utils.GetFunctionName(
				p.repository.MakeParserRequest))
	}

	response := new(domain.ParserResponse)
	if json.Unmarshal(body, response); err != nil {
		return nil, err
	}

	if len(response.Results) <= 0 {
		return nil, errors.New("no parsed data")
	}

	return response, nil
}
