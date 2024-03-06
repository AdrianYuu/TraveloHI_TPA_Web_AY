package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func SendBroadcast(c *gin.Context) {
	var broadcast models.Broadcast

	if err := c.Bind(&broadcast); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(broadcast.Title) == ""{
		c.JSON(400, gin.H{"message": "Broadcast title can't be empty!"})
		return
	}

	if strings.TrimSpace(broadcast.Message) == ""{
		c.JSON(400, gin.H{"message": "Broadcast message can't be empty!"})
		return
	}

	SendBroadcastEmail(broadcast)
}