package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetHotelFacilities(c *gin.Context) {
	var hotelFacilities []models.HotelFacility

	result := config.DB.Find(&hotelFacilities)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting hotel facilities."})
		return
	}

	c.JSON(200, hotelFacilities)
}