package controllers

import (
	"github.com/gin-gonic/gin"
)

func SendPaymentEmailToUser(c *gin.Context) {
	var request struct{
		Email string
		Message string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	SendPaymentEmail(request.Email, request.Message)
	c.JSON(200, gin.H{"message": "Success send payment email."})
}