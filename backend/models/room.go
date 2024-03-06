package models

import "time"

type Room struct {
	ID            	uint 			`gorm:"primaryKey"`
	RoomPrice 		string
	HotelID			uint
	Hotel			Hotel			`gorm:"foreignKey:HotelID"`
	RoomTypeID		uint
	RoomType		RoomType 		`gorm:"foreignKey:RoomTypeID"`
	RoomFacilities	[]RoomFacility  `gorm:"many2many:room_facility_relation"`
	RoomPictures    []RoomPicture
	CreatedAt   	time.Time
	UpdatedAt   	time.Time
	RoomPictureLength *int
}