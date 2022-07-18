package repository

import (
	"goauth"

	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user goauth.User) (int, error)
	GetUser(username, password string) (goauth.User, error)
}

type Repository struct {
	Authorization
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		Authorization: NewAuthPostgres(db),
	}

}
