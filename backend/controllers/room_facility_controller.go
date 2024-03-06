package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetRoomFacilities(c *gin.Context) {
	var roomFacilities []models.RoomFacility

	result := config.DB.Find(&roomFacilities)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting room facilities."})
		return
	}

	c.JSON(200, roomFacilities)
}