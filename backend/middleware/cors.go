package middleware

import (
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitCORS(r *gin.Engine) {
	PORT := os.Getenv("ALLOWED_PORT")
	HOST := fmt.Sprintf("http://localhost:%s", PORT)

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{HOST},
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "Authorization", "X-CSRF-Token"},
		AllowCredentials: true,
		MaxAge:           12 * 3600,
	}))
}