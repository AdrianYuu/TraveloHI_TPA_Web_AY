package models

import "time"

type HotelReview struct {
	ID            uint `gorm:"primaryKey"`
	Name		  string
	HotelID       uint
	Hotel         Hotel `gorm:"foreignKey:HotelID"`
	Review        string
	HotelRatings  []HotelRating
	CreatedAt     time.Time
	UpdatedAt     time.Time
}