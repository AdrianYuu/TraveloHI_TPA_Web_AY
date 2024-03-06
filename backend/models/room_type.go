package models

import "time"

type RoomType struct {
	ID           	uint 		`gorm:"primaryKey"`
	Rooms 			[]Room
	RoomTypeName	string
	CreatedAt   	time.Time
	UpdatedAt   	time.Time
}