package models

import "time"

type Promo struct {
	ID            		uint 		`gorm:"primaryKey"`
	PromoCode			string
	PromoDescription	string
	PromoType			string
	PromoDiscount		string
	PromoPictureURL		string
	StartDate			string
	FinishDate			string
	CreatedAt   		time.Time
	UpdatedAt   		time.Time
}