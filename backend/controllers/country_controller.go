package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetCountries(c *gin.Context) {
	var countries []models.Country

	result := config.DB.Find(&countries)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting countries."})
		return
	}

	c.JSON(200, countries)
}