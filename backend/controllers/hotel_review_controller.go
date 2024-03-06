package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateHotelReview(c *gin.Context) {
	var hotelReview models.HotelReview

	if err := c.Bind(&hotelReview); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(hotelReview.Review) == "" {
		c.JSON(400, gin.H{"message": "Hotel review can't be empty!"})
		return
	}

	result := config.DB.Create(&hotelReview)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating hotel review."})
		return
	}

	c.JSON(200, gin.H{"HotelReviewID": hotelReview.ID})
}