package handler

import (
	"goauth/pkg/service"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
	return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	router := gin.New()

	auth := router.Group("/auth")
	{
		auth.POST("/sign-up", h.sighUp)
		auth.POST("/sign-in", h.sighIn)
	}
	api := router.Group("", h.userIdentity)
	{
		api.GET("/", h.home)
	}

	return router
}
