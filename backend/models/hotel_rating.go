package models

import "time"

type HotelRating struct {
	ID            uint `gorm:"primaryKey"`
	HotelReviewID uint
	HotelReview   HotelReview `gorm:"foreignKey:HotelReviewID"`
	HotelRatingTypeID uint
	HotelRatingType HotelRatingType `gorm:"foreignKey:HotelRatingTypeID"`
	Rating        int
	CreatedAt     time.Time
	UpdatedAt     time.Time
}