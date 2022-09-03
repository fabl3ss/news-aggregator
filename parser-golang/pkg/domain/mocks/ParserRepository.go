// Code generated by MockGen. DO NOT EDIT.
// Source: parser-golang/pkg/domain/parse.go

// Package mock_domain is a generated GoMock package.
package mock_domain

import (
	domain "parser-golang/pkg/domain"
	reflect "reflect"

	gomock "github.com/golang/mock/gomock"
)

// MockParserRepository is a mock of ParserRepository interface.
type MockParserRepository struct {
	ctrl     *gomock.Controller
	recorder *MockParserRepositoryMockRecorder
}

// MockParserRepositoryMockRecorder is the mock recorder for MockParserRepository.
type MockParserRepositoryMockRecorder struct {
	mock *MockParserRepository
}

// NewMockParserRepository creates a new mock instance.
func NewMockParserRepository(ctrl *gomock.Controller) *MockParserRepository {
	mock := &MockParserRepository{ctrl: ctrl}
	mock.recorder = &MockParserRepositoryMockRecorder{mock}
	return mock
}

// EXPECT returns an object that allows the caller to indicate expected use.
func (m *MockParserRepository) EXPECT() *MockParserRepositoryMockRecorder {
	return m.recorder
}

// MakeParserRequest mocks base method.
func (m *MockParserRepository) MakeParserRequest(request *domain.RequestParameters) ([]byte, error) {
	m.ctrl.T.Helper()
	ret := m.ctrl.Call(m, "MakeParserRequest", request)
	ret0, _ := ret[0].([]byte)
	ret1, _ := ret[1].(error)
	return ret0, ret1
}

// MakeParserRequest indicates an expected call of MakeParserRequest.
func (mr *MockParserRepositoryMockRecorder) MakeParserRequest(request interface{}) *gomock.Call {
	mr.mock.ctrl.T.Helper()
	return mr.mock.ctrl.RecordCallWithMethodType(mr.mock, "MakeParserRequest", reflect.TypeOf((*MockParserRepository)(nil).MakeParserRequest), request)
}
