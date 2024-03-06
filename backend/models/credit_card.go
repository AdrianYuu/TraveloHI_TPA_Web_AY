package models

import "time"

type CreditCard struct {
	ID            		uint 		`gorm:"primaryKey"`
	UserID				uint
	User				User 		`gorm:"foreignKey:UserID"`
	CardNumber 			string
	BankName			string
	CVV					string
	ExpiryDate			string
	CreatedAt   		time.Time
	UpdatedAt  			time.Time
}