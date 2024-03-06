package models

import "time"

type City struct {
	ID          uint 		`gorm:"primaryKey"`
	CountryID	uint
	Country		Country 	`gorm:"foreignKey:CountryID"`
	Airports	[]Airport
	CityName	string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}