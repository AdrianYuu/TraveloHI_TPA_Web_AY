package models

import "time"

type FlightTicket struct {
	ID              uint 		`gorm:"primaryKey"`
	UserID  		uint
	User			User		`gorm:"foreignKey:UserID"`
	FlightID		uint		
	Flight			Flight		`gorm:"foreignKey:FlightID"`
	Seats			[]Seat
	SelectedSeat	int
	IsLuggage    	bool
	Status			string
	CreatedAt   	time.Time
	UpdatedAt  		time.Time
}