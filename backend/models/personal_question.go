package models

import "time"

type PersonalQuestion struct {
	ID            	uint 				`gorm:"primaryKey"`
	Question 		string
	PersonalAnswers []PersonalAnswer
	CreatedAt   	time.Time
	UpdatedAt   	time.Time
}