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
		newErrorResponse(c, http.StatusUnauthorized, "unauthenticated")
		return
	}

	userId, err := h.services.ParseToken(cookie)
	if err != nil {
		newErrorResponse(c, http.StatusUnauthorized, err.Error())
		return
	}

	c.Set(userCtx, userId)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}
