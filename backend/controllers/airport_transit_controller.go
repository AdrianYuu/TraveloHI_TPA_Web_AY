package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateAirportTransit(c *gin.Context) {
	var airportTransit models.AirportTransit

	if err := c.Bind(&airportTransit); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	result := config.DB.Create(&airportTransit)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating airport transit."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created airport transit."})
}