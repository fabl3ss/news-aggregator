package repository

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
)
import "parser-golang/pkg/domain"
import "github.com/stretchr/testify/mock"

type NeuralRepository struct {
	mock.Mock
}

func (m *NeuralRepository) GetNeuralResponse(url string, body []byte) (*domain.NeuralResponse, error) {
	// Make http request to Neural
	resp, err := http.Post(url, "application/json", bytes.NewBuffer(body))
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()
	return m.ExtractNeuralResponse(resp)
}

func (m *NeuralRepository) ExtractNeuralResponse(response *http.Response) (*domain.NeuralResponse, error) {
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		return nil, err
	}

	res := new(domain.NeuralResponse)
	if err = json.Unmarshal(body, res); err != nil {
		return nil, err
	}
	return res, nil
}
