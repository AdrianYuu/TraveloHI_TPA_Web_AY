package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func CreateFlightTicket(c *gin.Context) {
	var flightTicket models.FlightTicket

	if err := c.Bind(&flightTicket); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if flightTicket.SelectedSeat <= 0 {
		c.JSON(400, gin.H{"message": "There must be at least 1 seat selected."})
		return
	}

	result := config.DB.Create(&flightTicket)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating flight ticket."})
		return
	}

	c.JSON(200, gin.H{"FlightTicketID": flightTicket.ID})
}

func GetFlightTicketsUnpaid(c *gin.Context) {
	var request struct{
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var flightTickets []models.FlightTicket
	result := config.DB.Where("user_id = ? AND status = ?", request.UserID, "Unpaid").
											Preload("Flight").
											Preload("Seats").
											Preload("Flight.Airplane").
											Preload("Flight.OriginAirport").
											Preload("Flight.OriginAirport.City").
											Preload("Flight.DestinationAirport").
											Preload("Flight.DestinationAirport.City").
											Preload("Flight.AirportTransits").
											Preload("Flight.AirportTransits.Airport").
											Preload("Flight.AirportTransits.Airport.City").
											Preload("Flight.Airplane.Airline").
											Find(&flightTickets)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting flight tickets."})
		return
	}

	c.JSON(200, flightTickets)
}

func GetFlightTicketsPaid(c *gin.Context) {
	var request struct{
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var flightTickets []models.FlightTicket
	result := config.DB.Where("user_id = ? AND status = ?", request.UserID, "Paid").
											Preload("Flight").
											Preload("Seats").
											Preload("Flight.Airplane").
											Preload("Flight.OriginAirport").
											Preload("Flight.OriginAirport.City").
											Preload("Flight.DestinationAirport").
											Preload("Flight.DestinationAirport.City").
											Preload("Flight.AirportTransits").
											Preload("Flight.AirportTransits.Airport").
											Preload("Flight.AirportTransits.Airport.City").
											Preload("Flight.Airplane.Airline").
											Find(&flightTickets)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting flight tickets."})
		return
	}

	c.JSON(200, flightTickets)
}

func UpdateFlightTicketStatus(c *gin.Context){
	var request struct {
		FlightTicketID uint
		Status 		   string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if request.FlightTicketID == 0 {
		c.JSON(400, gin.H{"message": "Flight Ticket is required."})
		return
	}

	if strings.TrimSpace(request.Status) == "" {
		c.JSON(400, gin.H{"message": "Status can't be empty."})
		return
	}
	
	var updatedFlightTicket models.FlightTicket
	result := config.DB.First(&updatedFlightTicket, "ID = ?", request.FlightTicketID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	updatedFlightTicket.Status = request.Status
	config.DB.Save(&updatedFlightTicket)
	c.JSON(200, gin.H{"message": "Successfully update flight ticket status."})
}
