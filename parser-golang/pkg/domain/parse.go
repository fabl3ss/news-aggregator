package domain

type RequestParameters struct {
	Lang     string   `json:"language"`
	Country  string   `json:"country"`
	Category string   `json:"category"`
	Keywords []string `json:"kwords"`
}

type ParserResponse struct {
	Status       string `json:"status"`
	TotalResults int    `json:"totalResults"`
	Results      []News `json:"results"`
	NextPage     int    `json:"nextPage"`
}

// ParserUsecase represent the article's use-cases
type ParserUsecase interface {
	ParseNews(request *RequestParameters) (*ParserResponse, error)
}

// ParserRepository represent the parser's repository contract
type ParserRepository interface {
	MakeParserRequest(request *RequestParameters) ([]byte, error)
}
