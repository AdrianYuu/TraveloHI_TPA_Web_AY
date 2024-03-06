package controllers

import (
	"fmt"
	"math/rand"
	"net/http"
	"os"
	"time"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func CreateAndSendOTP(c *gin.Context){
	var request struct {
		Email string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "email = ?", request.Email)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "User not found."})
		return
	}

	OTPCode := GenerateOTP()
	now := time.Now()
	user.OTPCode = &OTPCode
	user.OTPCreatedAt = &now

	config.DB.Save(&user)

	SendOTPEmail(request.Email, OTPCode)
	c.JSON(200, gin.H{"message": "Successfully generate and send OTP."})
}

func LoginOTP(c *gin.Context){
	var request struct {
		Email 		string
		OTPCode 	string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.
				Where("email = ? AND otp_code = ? AND is_banned = FALSE", request.Email, request.OTPCode).
				Where("otp_created_at >= ?", time.Now().Add(-1 * time.Minute)).
				First(&user)

	if result.Error != nil {
		c.JSON(400, gin.H{"message": "OTP code is not valid or your account is banned."})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"UserID": user.ID,
		"ExpiredDate": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		c.JSON(500, gin.H{"message": "Failed to create token."})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("JWT", tokenString, 3600 * 24 * 30, "", "", false, true)

	c.JSON(200, user)
}

func GenerateOTP() string {
	otp := rand.Intn(1000000) % 1000000
	return fmt.Sprintf("%06d", otp)
}