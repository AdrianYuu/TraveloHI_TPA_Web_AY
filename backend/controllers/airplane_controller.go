package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func GetAirplanes(c *gin.Context) {
	var airplanes []models.Airplane

	result := config.DB.Preload("Airline").Find(&airplanes)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting airplanes."})
		return
	}

	c.JSON(200, airplanes)
}

func CreateAirplane(c *gin.Context) {
	var airplane models.Airplane

	if err := c.Bind(&airplane); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(airplane.AirplaneName) == ""{
		c.JSON(400, gin.H{"message": "Airplane name is required."})
		return
	}

	if (airplane.AirlineID) == 0{
		c.JSON(400, gin.H{"message": "Airline name is required."})
		return
	}

	result := config.DB.Create(&airplane)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating airplane."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created airplane."})
}

func CheckAirplaneNameExists(c *gin.Context) {
	var request struct {
		AirplaneName string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if util.IsAirplaneNameExists(request.AirplaneName) {
		c.JSON(200, gin.H{"exists": true})
	} else {
		c.JSON(200, gin.H{"exists": false})
	}
}
