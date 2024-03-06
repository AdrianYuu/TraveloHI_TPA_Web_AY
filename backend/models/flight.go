package models

import "time"

type Flight struct {
	ID            			uint 			`gorm:"primaryKey"`
	AirplaneID				uint
	Airplane				Airplane		`gorm:"foreignKey:AirplaneID"`
	OriginAirportID			uint
	OriginAirport			Airport 		`gorm:"foreignKey:OriginAirportID"`
	DestinationAirportID	uint
	DestinationAirport		Airport 		`gorm:"foreignKey:DestinationAirportID"`
	FlightCode 				string
	DepartureDate			string
	ArrivalDate				string
	FlightPrice				string
	AirportTransits     	[]AirportTransit
	FlightTickets			[]FlightTicket
	CreatedAt   			time.Time
	UpdatedAt   			time.Time
}