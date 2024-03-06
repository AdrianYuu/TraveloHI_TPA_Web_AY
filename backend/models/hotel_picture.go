package models

import "time"

type HotelPicture struct {
	ID           uint 	`gorm:"primaryKey"`
	HotelID      uint
	Hotel        Hotel 	`gorm:"foreignKey:HotelID"`
	URL 		 string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
