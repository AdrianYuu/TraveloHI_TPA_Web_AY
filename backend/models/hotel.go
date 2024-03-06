package models

import (
	"time"
)

type Hotel struct {
	ID               uint            `gorm:"primaryKey"`
	HotelName        string
	HotelDescription string
	HotelAddress     string
	HotelStar        string
	HotelFacilities  []HotelFacility `gorm:"many2many:hotel_facility_relation"`
	HotelReviews     []HotelReview
	Rooms            []Room
	HotelPictures    []HotelPicture
	CountryID	     uint
	Country		     Country 			`gorm:"foreignKey:CountryID"`
	CreatedAt        time.Time
	UpdatedAt        time.Time
	HotelPictureLength *int
}