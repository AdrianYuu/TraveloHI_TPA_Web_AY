package controllers

import (
	"regexp"
	"sort"
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func CreateFlight(c *gin.Context) {
	var flight models.Flight

	if err := c.Bind(&flight); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(flight.FlightCode) == "" {
		c.JSON(400, gin.H{"message": "Flight code is required."})
		return
	}

	if util.IsFlightCodeExists(flight.FlightCode) {
		c.JSON(400, gin.H{"message": "Flight code is already exists."})
		return
	}

	codePattern := regexp.MustCompile(`^[A-Z]{2}\d{3}$`)
    if !codePattern.MatchString(flight.FlightCode) {
        c.JSON(400, gin.H{"message": "Flight code must follow the pattern [A-Z][A-Z][0-9][0-9][0-9]."})
		return
    }

	if strings.TrimSpace(flight.FlightPrice) == "" {
		c.JSON(400, gin.H{"message": "Flight price is required."})
		return
	}

	if !util.IsNumericStr(flight.FlightPrice) {
		c.JSON(400, gin.H{"message": "Flight price must be numeric."})
		return
	}

	if util.StringToInt(flight.FlightPrice) <= 0 {
		c.JSON(400, gin.H{"message": "Flight price must be greater than 0."})
		return
	}

	if flight.AirplaneID == 0 {
		c.JSON(400, gin.H{"message": "Airplane is required."})
		return
	}

	if flight.OriginAirportID == 0 {
		c.JSON(400, gin.H{"message": "Origin airport is required."})
		return
	}

	if flight.DestinationAirportID == 0 {
		c.JSON(400, gin.H{"message": "Destination airport is required."})
		return
	}

	if flight.DestinationAirportID == flight.OriginAirportID {
		c.JSON(400, gin.H{"message": "Origin airport can't be the same as the destination airport."})
		return
	}

	if flight.DepartureDate == "" {
		c.JSON(400, gin.H{"message": "Departure date is required."})
		return
	}

	if flight.ArrivalDate == "" {
		c.JSON(400, gin.H{"message": "Arrival date is required."})
		return
	}

	if !util.IsFinishAfterStart(flight.DepartureDate, flight.ArrivalDate){
		c.JSON(400, gin.H{"message": "Arrival date must be after departure date."})
		return
	}

	result := config.DB.Create(&flight)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating flight."})
		return
	}

	c.JSON(200, gin.H{"FlightID": flight.ID})
}

func CheckFlightCodeExists(c *gin.Context) {
	var request struct {
		FlightCode string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if util.IsFlightCodeExists(request.FlightCode) {
		c.JSON(200, gin.H{"exists": true})
	} else {
		c.JSON(200, gin.H{"exists": false})
	}
}

func GetFlights(c *gin.Context) {
    var flights []models.Flight

    result := config.DB.Preload("Airplane").
						Preload("OriginAirport").
						Preload("OriginAirport.City").
						Preload("OriginAirport.City.Country").
						Preload("DestinationAirport").
						Preload("DestinationAirport.City").
						Preload("DestinationAirport.City.Country").
						Preload("AirportTransits").
						Preload("AirportTransits.Airport").
						Preload("AirportTransits.Airport.City").
						Preload("Airplane.Airline").
						Find(&flights)

    if result.Error != nil {
        c.JSON(500, gin.H{"message": "Error getting flights."})
        return
    }

    c.JSON(200, flights)
}

func GetFlight(c *gin.Context) {
	var request struct{
		FlightID int
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

    var flight models.Flight
    result := config.DB.Preload("Airplane").
						Preload("OriginAirport").
						Preload("OriginAirport.City").
						Preload("OriginAirport.City.Country").
						Preload("DestinationAirport").
						Preload("DestinationAirport.City").
						Preload("DestinationAirport.City.Country").
						Preload("AirportTransits").
						Preload("AirportTransits.Airport").
						Preload("AirportTransits.Airport.City").
						Preload("Airplane.Airline").
						Preload("FlightTickets").
						Preload("FlightTickets.Seats").
						First(&flight, "ID = ?", request.FlightID)

    if result.Error != nil {
        c.JSON(500, gin.H{"message": "Error getting flights."})
        return
    }

    c.JSON(200, flight)
}

func GetFlightsByCountryName(c *gin.Context) {
	var request struct{
		CountryName string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

    var flights []models.Flight
    result := config.DB.Preload("Airplane").
						Preload("OriginAirport").
						Preload("OriginAirport.City").
						Preload("OriginAirport.City.Country").
						Preload("DestinationAirport").
						Preload("DestinationAirport.City").
						Preload("DestinationAirport.City.Country").
						Preload("AirportTransits").
						Preload("AirportTransits.Airport").
						Preload("AirportTransits.Airport.City").
						Preload("Airplane.Airline").
						Preload("FlightTickets").
						Preload("FlightTickets.Seats").
						Joins("JOIN airports ON flights.origin_airport_id = airports.id OR flights.destination_airport_id = airports.id").
						Joins("JOIN cities ON airports.city_id = cities.id").
						Joins("JOIN countries ON cities.country_id = countries.id").
						Where("countries.country_name = ?", request.CountryName).
						Find(&flights)

    if result.Error != nil {
        c.JSON(500, gin.H{"message": "Error getting flights."})
        return
    }

    c.JSON(200, flights)
}

func GetTopFiveFlights(c *gin.Context) {
    var flights []models.Flight

    result := config.DB.Preload("Airplane").
						Preload("OriginAirport").
						Preload("OriginAirport.City").
						Preload("DestinationAirport").
						Preload("DestinationAirport.City").
						Preload("AirportTransits").
						Preload("AirportTransits.Airport").
						Preload("AirportTransits.Airport.City").
						Preload("Airplane.Airline").
						Find(&flights)

    if result.Error != nil {
        c.JSON(500, gin.H{"message": "Error getting flights."})
        return
    }

    flightTicketCounts := make(map[uint]int)
	var flightTickets []struct {
		FlightID    uint
		TicketCount int
	}
	config.DB.Model(&models.FlightTicket{}).
		Select("flight_id, count(*) as ticket_count").
		Group("flight_id").
		Scan(&flightTickets)

	for _, ticket := range flightTickets {
		flightTicketCounts[ticket.FlightID] = ticket.TicketCount
	}

	sort.SliceStable(flights, func(i, j int) bool {
		return flightTicketCounts[flights[i].ID] > flightTicketCounts[flights[j].ID]
	})

	var topFiveFlights []models.Flight
	if len(flights) > 5 {
		topFiveFlights = flights[:5]
	} else {
		topFiveFlights = flights
	}

	c.JSON(200, topFiveFlights)
}
