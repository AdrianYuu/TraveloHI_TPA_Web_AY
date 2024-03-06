package models

import "time"

type HotelRatingType struct {
	ID                 uint `gorm:"primaryKey"`
	HotelRatings       []HotelRating
	HotelRatingTypeName     string
	CreatedAt          time.Time
	UpdatedAt          time.Time
}