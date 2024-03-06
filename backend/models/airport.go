package models

import "time"

type Airport struct {
	ID          	uint 		`gorm:"primaryKey"`
	CityID			uint
	City			City 		`gorm:"foreignKey:CityID"`
	AirportCode 	string
	AirportName 	string
	AirportTransits []AirportTransit
	CreatedAt   	time.Time
	UpdatedAt   	time.Time
}