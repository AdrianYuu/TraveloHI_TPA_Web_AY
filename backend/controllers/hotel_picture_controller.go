package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateHotelPicture(c *gin.Context) {
	var hotelPicture models.HotelPicture

	if err := c.Bind(&hotelPicture); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	result := config.DB.Create(&hotelPicture)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating hotel picture."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created hotel picture."})
}
