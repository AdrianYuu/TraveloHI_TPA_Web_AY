package models

import "time"

type AirportTransit struct {
	ID        uint		`gorm:"primaryKey"`
	AirportID uint
	Airport   Airport 	`gorm:"foreignKey:AirportID"`
	FlightID  uint
	Flight	  Flight 	`gorm:"foreignKey:FlightID"`
	CreatedAt time.Time
	UpdatedAt time.Time
}