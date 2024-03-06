package models

import "time"

type RoomPicture struct {
	ID           uint 	`gorm:"primaryKey"`
	RoomID       uint
	Room         Room 	`gorm:"foreignKey:RoomID"`
	URL 		 string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}
