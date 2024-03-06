package models

import "time"

type HotelBooking struct {
	ID            	uint 		`gorm:"primaryKey"`
	UserID  		uint
	User			User		`gorm:"foreignKey:UserID"`
	RoomID     		uint
	Room			Room 		`gorm:"foreignKey:RoomID"`
	CheckInDate		string
	CheckOutDate	string
	Status			string
	IsReviewed		bool
	CreatedAt   	time.Time
	UpdatedAt   	time.Time
}