package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateRoomPicture(c *gin.Context) {
	var roomPicture models.RoomPicture

	if err := c.Bind(&roomPicture); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	result := config.DB.Create(&roomPicture)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating room picture."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created room picture."})
}