package domain

import "net/http"

type NeuralRequest struct {
	Text      string `json:"text"`
	Language  string `json:"language"`
	Sentences string `json:"sentences"`
}

type NeuralResponse struct {
	Text string `json:"response"`
}

// NeuralUsecase represent the article's use-cases
type NeuralUsecase interface {
	GetTextForNeural(res *ParserResponse) string
	NeuralRequestBody(res *ParserResponse) ([]byte, error)
	ProcessNews(url string, parsed *ParserResponse) (*NeuralResponse, error)
}

// NeuralRepository represent the parser's repository contract
type NeuralRepository interface {
	GetNeuralResponse(url string, body []byte) (*NeuralResponse, error)
	ExtractNeuralResponse(response *http.Response) (*NeuralResponse, error)
}
