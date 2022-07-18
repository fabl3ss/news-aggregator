package middlewares

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"os"
	"time"
)

func Logger() gin.HandlerFunc {
	return gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		return fmt.Sprintf("%s - [%s] %s %s %d %s\n",
			param.ClientIP,
			param.TimeStamp.Format(time.RFC822),
			param.Method,
			param.Path,
			param.StatusCode,
			param.Latency,
		)
	})
}

func SetupLogOutput(dir string) {
	filename := time.Now().Format("2006-Jan-02") + ".log"
	f, _ := os.Create(dir + filename)
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
}
