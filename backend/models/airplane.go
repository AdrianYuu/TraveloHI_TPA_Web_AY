package models

import "time"

type Airplane struct {
	ID            		uint 			`gorm:"primaryKey"`
	AirlineID			uint
	Airline				Airline 		`gorm:"foreignKey:AirlineID"`
	AirplaneName 		string
	Flights				[]Flight
	CreatedAt   		time.Time
	UpdatedAt   		time.Time
}