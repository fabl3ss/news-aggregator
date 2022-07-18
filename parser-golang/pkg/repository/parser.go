package repository

import (
	"io/ioutil"
	"net/http"
	"parser-golang/config"
	"parser-golang/pkg/domain"
)

type ParserRepository struct{}

func (p *ParserRepository) AddParameter(param string, paramName string, initialString *string) {
	if len(param) != 0 {
		*initialString += paramName + param
	}
}

func (p *ParserRepository) AddKeyWordsParameter(params *domain.RequestParameters, initialString *string) {
	if len(params.Keywords) <= 0 || params.Keywords[0] == "" {
		return
	}

	// Append keywords to request string
	*initialString += "&q="
	for i, v := range params.Keywords {
		if v != "null" {
			*initialString += v
			if i+1 < len(params.Keywords) {
				*initialString += "%20AND%20"
			}
		}
	}
}

func (p *ParserRepository) CollectParameters(params *domain.RequestParameters) string {
	var resultString string
	p.AddParameter(params.Lang, "&language=", &resultString)
	p.AddParameter(params.Country, "&country=", &resultString)
	p.AddParameter(params.Category, "&category=", &resultString)
	p.AddKeyWordsParameter(params, &resultString)

	return resultString
}

func (p *ParserRepository) ParseWithParams(params *domain.RequestParameters) ([]byte, error) {
	if params.Lang == "" {
		params.Lang = "en"
	}

	cfg := config.GetConfig()
	request := cfg.ParserApiUrl + cfg.ParserApiToken + p.CollectParameters(params)

	resp, err := http.Get(request)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	//For prettier json output use -> return json.MarshalIndent(&byteJson, "", "\t")
	// Format return -> return utils.FormatJSON(byteJson)
	return ioutil.ReadAll(resp.Body)
}

func (p *ParserRepository) MakeParserRequest(request *domain.RequestParameters) ([]byte, error) {
	response, err := p.ParseWithParams(request)
	if err != nil {
		return nil, err
	}

	return response, nil
}
