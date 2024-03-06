package models

import "time"

type RoomFacility struct {
	ID            	uint 		`gorm:"primaryKey"`
	FacilityName	string
	Rooms			[]Room		`gorm:"many2many:room_facility_relation"`
	CreatedAt   	time.Time
	UpdatedAt   	time.Time
}