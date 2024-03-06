package models

import "time"

type Country struct {
	ID          uint 		`gorm:"primaryKey"`
	CountryName string
	Cities		[]City
	Hotels      []Hotel
	CreatedAt   time.Time
	UpdatedAt   time.Time
}