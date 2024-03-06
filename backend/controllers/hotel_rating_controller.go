package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateHotelRating(c *gin.Context) {
	var hotelRating models.HotelRating

	if err := c.Bind(&hotelRating); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if hotelRating.Rating == 0 {
		c.JSON(400, gin.H{"message": "Hotel rating is required."})
		return
	}

	result := config.DB.Create(&hotelRating)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating hotel rating."})
		return
	}

	c.JSON(200, gin.H{"message": "Success create hotel rating."})
}