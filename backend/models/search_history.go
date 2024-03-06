package models

import "time"

type SearchHistory struct {
	ID          uint 		`gorm:"primaryKey"`
	UserID 	   	uint
	User        User		`gorm:"foreignKey:UserID"`
	Searched   	string
	CreatedAt   time.Time
	UpdatedAt   time.Time
}