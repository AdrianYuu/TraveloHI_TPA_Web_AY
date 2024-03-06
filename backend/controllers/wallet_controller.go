package controllers

import (
	"fmt"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func UpdateWallet(c *gin.Context) {
	var request struct {
		ID int
		Amount int
	}

	if err := c.Bind(&request); err != nil {
		fmt.Println(err)
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "id = ?", request.ID)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if !util.IsValidAmount(request.Amount) {
		c.JSON(400, gin.H{"message": "Amount must be a numeric value greater than 0."})
		return
	}
	
	user.WalletBalance += request.Amount;
	config.DB.Save(&user)
	c.JSON(200, gin.H{"message": "Successfully update user wallet."})
}

func PayUsingWallet(c *gin.Context){
	var request struct {
		UserID uint
		Amount int
		PaymentType string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	fmt.Println(request.UserID)

	var user models.User
	result := config.DB.First(&user, "ID = ?", request.UserID)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if request.Amount > user.WalletBalance {
		c.JSON(400, gin.H{"message": "Wallet is not enough."})
		return
	}

	user.WalletBalance -= request.Amount;
	config.DB.Save(&user)
	c.JSON(200, gin.H{"message": "Successfully pay using wallet."})
}
