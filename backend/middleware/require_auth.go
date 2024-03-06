package middleware

import (
	"fmt"
	"os"
	"time"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context){
	tokenString, err := c.Cookie("JWT")

	if err != nil {
		c.AbortWithStatus(401)
	}

	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}

		return []byte(os.Getenv("SECRET_KEY")), nil
	})

	if err != nil || !token.Valid {
        c.AbortWithStatus(401)
        return
    }

	if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
		if float64(time.Now().Unix()) > claims["ExpiredDate"].(float64){
			c.AbortWithStatus(401)
		}

		var user models.User
		result := config.DB.First(&user, "id = ?", claims["UserID"])
		if result.Error != nil {
			c.JSON(500, gin.H{"message": "Error getting users."})
			return
		}

		if user.ID == 0 {
			c.AbortWithStatus(401)
		}
		c.Set("user", user)
		c.Next()
		
	} else{
		c.AbortWithStatus(401)
	}
}