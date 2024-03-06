package models

import "time"

type HotelFacility struct {
	ID           uint     	`gorm:"primaryKey"`
	FacilityName string
	Hotels       []Hotel 	`gorm:"many2many:hotel_facility_relation"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
}