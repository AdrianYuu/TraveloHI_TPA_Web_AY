package controllers

import (
	"errors"
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCreditCards(c *gin.Context) {
	var request struct{
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var creditCards []models.CreditCard
	result := config.DB.Where("user_id = ?", request.UserID).Find(&creditCards)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting credit card."})
		return
	}

	c.JSON(200, creditCards)
}

func CreateCreditCard(c *gin.Context) {
	var creditCard models.CreditCard

	if err := c.Bind(&creditCard); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(creditCard.BankName) == ""{
		c.JSON(400, gin.H{"message": "Bank name is required."})
		return 
	}

	if strings.TrimSpace(creditCard.CardNumber) == ""{
		c.JSON(400, gin.H{"message": "Card number is required."})
		return 
	}

	if len(creditCard.CardNumber) != 16 {
		c.JSON(400, gin.H{"message": "Card number must be 16 characters long."})
		return 
	}

	if !util.IsNumericStr(creditCard.CardNumber) {
		c.JSON(400, gin.H{"message": "Card number must be numeric."})
		return 
	}

	if strings.TrimSpace(creditCard.CVV) == "" {
		c.JSON(400, gin.H{"message": "CVV is required."})
		return 
	}

	if len(creditCard.CVV) != 3{
		c.JSON(400, gin.H{"message": "CVV must be 3 characters long."})
		return 
	}

	if !util.IsNumericStr(creditCard.CVV) {
		c.JSON(400, gin.H{"message": "CVV must be numeric."})
		return 
	}

	if strings.TrimSpace(creditCard.ExpiryDate) == "" {
		c.JSON(400, gin.H{"message": "Card expiry date is required."})
		return 
	}

	result := config.DB.Create(&creditCard)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating credit card."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created credit card."})
}

func PayUsingCreditCard(c *gin.Context){
	var request struct {
		UserID uint
		CreditCardID uint
		PaymentType string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if request.CreditCardID == 0 {
		c.JSON(400, gin.H{"message": "Credit card is required."})
		return
	}

	var creditCard models.CreditCard
	result := config.DB.First(&creditCard, "id = ? AND user_id = ?", request.CreditCardID, request.UserID)
	if result.Error != nil {
		if errors.Is(result.Error, gorm.ErrRecordNotFound) {
			c.JSON(400, gin.H{"message": "Credit card not found for the specified user."})
			return
		}
		c.JSON(500, gin.H{"message": "Internal server error."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully pay using credit card."})
}
