package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetAirports(c *gin.Context) {
	var airports []models.Airport

	result := config.DB.Find(&airports)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting airports."})
		return
	}

	c.JSON(200, airports)
}
