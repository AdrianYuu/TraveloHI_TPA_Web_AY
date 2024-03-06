package models

import "time"

type Airline struct {
	ID          			uint 		`gorm:"primaryKey"`
	AirlineName 			string
	AirlineDescription		string
	AirlinePictureURL		string
	Airplanes   			[]Airplane
	CreatedAt   			time.Time
	UpdatedAt   			time.Time
}