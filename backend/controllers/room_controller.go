package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func GetRooms(c *gin.Context) {
	var rooms []models.Room

	result := config.DB.Preload("Hotel").
						Preload("RoomType").
						Preload("RoomFacilities").
						Preload("RoomPictures").
						Find(&rooms)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting rooms."})
		return
	}

	c.JSON(200, rooms)
}

func CreateRoom(c *gin.Context) {
	var room models.Room

	if err := c.Bind(&room); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if room.HotelID == 0 {
		c.JSON(400, gin.H{"message": "Hotel is required."})
		return
	}

	if room.RoomTypeID == 0 {
		c.JSON(400, gin.H{"message": "Room type is required."})
		return
	}

	if strings.TrimSpace(room.RoomPrice) == ""{
		c.JSON(400, gin.H{"message": "Room price is required."})
		return
	}

	if !util.IsNumericStr(room.RoomPrice) {
		c.JSON(400, gin.H{"message": "Room price must be numeric."})
		return
	}

	if util.StringToInt(room.RoomPrice) <= 0 {
		c.JSON(400, gin.H{"message": "Room price must be greater than 0."})
		return
	}

	if len(room.RoomFacilities) == 0 {
		c.JSON(400, gin.H{"message": "At least one room facility must be selected."})
		return
	}

	if *room.RoomPictureLength == 0 {
		c.JSON(400, gin.H{"message": "At least one room picture is required."})
		return
	}

	if *room.RoomPictureLength > 4 {
		c.JSON(400, gin.H{"message": "Four picture is the maximum capacity."})
		return
	}

	result := config.DB.Create(&room)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating room."})
		return
	}

	c.JSON(200, gin.H{"RoomID": room.ID})
}