package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

const (
	userCtx = "userId"
)

func (h *Handler) userIdentity(c *gin.Context) {
	cookie, err := c.Cookie("jwt")
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, "unauthenticated")
		return
	}

	userId, err := h.services.ParseToken(cookie)
	if err != nil {
		newErrorResponce(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set(userCtx, userId)
}
