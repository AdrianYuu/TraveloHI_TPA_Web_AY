package models

import "time"

type PersonalAnswer struct {
	ID            			uint 				`gorm:"primaryKey"`
	UserID 					uint 				`gorm:"foreignKey:UserID"`
	User 					User
	PersonalQuestionID 		uint 				`gorm:"foreignKey:PersonalQuestionID"`
	PersonalQuestion 		PersonalQuestion
	Answer 					string
	CreatedAt   			time.Time
	UpdatedAt   			time.Time
}