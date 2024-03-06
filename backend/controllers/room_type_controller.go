package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetRoomTypes(c *gin.Context) {
	var roomTypes []models.RoomType

	result := config.DB.Find(&roomTypes)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting room types."})
		return
	}

	c.JSON(200, roomTypes)
}