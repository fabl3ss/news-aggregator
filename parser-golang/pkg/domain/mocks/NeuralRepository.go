// Code generated by MockGen. DO NOT EDIT.
// Source: parser-golang/pkg/domain/neural.go

// Package mock_domain is a generated GoMock package.
package mock_domain

import (
	http "net/http"
	domain "parser-golang/pkg/domain"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockNeuralRepository is a mock of NeuralRepository interface.
type MockNeuralRepository struct {
	ctrl     *gomock.Controller
	recorder *MockNeuralRepositoryMockRecorder
}

// MockNeuralRepositoryMockRecorder is the mock recorder for MockNeuralRepository.
type MockNeuralRepositoryMockRecorder struct {
	mock *MockNeuralRepository
}

// NewMockNeuralRepository creates a new mock instance.
func NewMockNeuralRepository(ctrl *gomock.Controller) *MockNeuralRepository {
	mock := &MockNeuralRepository{ctrl: ctrl}
	mock.recorder = &MockNeuralRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockNeuralRepository) EXPECT() *MockNeuralRepositoryMockRecorder {
	return m.recorder
}

// ExtractNeuralResponse mocks base method.
func (m *MockNeuralRepository) ExtractNeuralResponse(response *http.Response) (*domain.NeuralResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "ExtractNeuralResponse", response)
	ret0, _ := ret[0].(*domain.NeuralResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// ExtractNeuralResponse indicates an expected call of ExtractNeuralResponse.
func (mr *MockNeuralRepositoryMockRecorder) ExtractNeuralResponse(response interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "ExtractNeuralResponse", reflect.TypeOf((*MockNeuralRepository)(nil).ExtractNeuralResponse), response)
}

// GetNeuralResponse mocks base method.
func (m *MockNeuralRepository) GetNeuralResponse(url string, body []byte) (*domain.NeuralResponse, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "GetNeuralResponse", url, body)
	ret0, _ := ret[0].(*domain.NeuralResponse)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// GetNeuralResponse indicates an expected call of GetNeuralResponse.
func (mr *MockNeuralRepositoryMockRecorder) GetNeuralResponse(url, body interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "GetNeuralResponse", reflect.TypeOf((*MockNeuralRepository)(nil).GetNeuralResponse), url, body)
}