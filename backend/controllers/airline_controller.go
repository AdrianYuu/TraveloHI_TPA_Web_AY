package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func GetAirlines(c *gin.Context) {
	var airlines []models.Airline

	result := config.DB.Preload("Airplanes").Preload("Airplanes.Airline").Find(&airlines)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting airlines."})
		return
	}

	c.JSON(200, airlines)
}

func CreateAirline(c *gin.Context) {
	var airline models.Airline

	if err := c.Bind(&airline); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(airline.AirlineName) == "" {
		c.JSON(400, gin.H{"message": "Airline name is required."})
		return
	}

	if util.IsAirlineNameExists(airline.AirlineName) {
		c.JSON(400, gin.H{"message": "Airline name already exists."})
		return
	}

	if strings.TrimSpace(airline.AirlineDescription) == "" {
		c.JSON(400, gin.H{"message": "Airline description is required."})
		return
	}

	if strings.TrimSpace(airline.AirlinePictureURL) == "" {
		c.JSON(400, gin.H{"message": "Airline picture is required or the picture is in upload process."})
		return
	}

	result := config.DB.Create(&airline)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating airline."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created airline."})
}

func CheckAirlineNameExists(c *gin.Context) {
	var request struct {
		AirlineName string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if util.IsAirlineNameExists(request.AirlineName) {
		c.JSON(200, gin.H{"exists": true})
	} else {
		c.JSON(200, gin.H{"exists": false})
	}
}
