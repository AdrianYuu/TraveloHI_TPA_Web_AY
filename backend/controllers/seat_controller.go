package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateSeat(c *gin.Context) {
	var seat models.Seat

	if err := c.Bind(&seat); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(seat.SeatClass) == "" {
		c.JSON(400, gin.H{"message": "Seat class is required."})
		return
	}

	if strings.TrimSpace(seat.SeatNumber) == "" {
		c.JSON(400, gin.H{"message": "Seat number is required."})
		return
	}

	var existingSeat models.Seat
    if err := config.DB.
        Joins("JOIN flight_tickets ON seats.flight_ticket_id = flight_tickets.id").
        Where("flight_tickets.flight_id = ? AND seats.seat_number = ?", seat.FlightTicket.FlightID, seat.SeatNumber).
        First(&existingSeat).Error; err == nil {
        c.JSON(400, gin.H{"message": "Seat number already exists for this flight."})
        return
    }

	result := config.DB.Create(&seat)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating flight seat."})
		return
	}

	c.JSON(200, gin.H{"message": "Success create flight seat."})
}