package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetSearchHistory(c *gin.Context) {
	var request struct {
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var searchHistories []models.SearchHistory
	result := config.DB.Where("user_id = ?", request.UserID).
		Order("created_at desc").Limit(3).Find(&searchHistories)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting user history."})
		return
	}

	c.JSON(200, searchHistories)
}

func CreateSearchHistory(c *gin.Context) {
	var searchHistory models.SearchHistory

	if err := c.Bind(&searchHistory); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(searchHistory.Searched) == "" {
		c.JSON(400, gin.H{"message": "Search history can't be em."})
		return
	}

	result := config.DB.Create(&searchHistory)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating search history."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created search history."})
}

func GetTop5SearchHistory(c *gin.Context) {
	var searchHistories []models.SearchHistory
	result := config.DB.Model(&models.SearchHistory{}).
		Select("searched, count(searched) as search_count").
		Group("searched").Order("search_count desc").Limit(5).Find(&searchHistories)
		
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting top search history."})
		return
	}

	c.JSON(200, searchHistories)
}