package models

import "time"

type User struct {
	ID            		uint 				`gorm:"primaryKey"`
	FirstName         	string			
	LastName          	string
	Email			 	string
	DateOfBirth       	string
	Password          	string
	ConfirmPassword 	string
	Gender            	string
	ProfilePictureURL	string
	Points	  			int
	PersonalAnswers   	[]PersonalAnswer
	SearchHistories	  	[]SearchHistory
	CreditCards		  	[]CreditCard
	RoleID			  	uint
	Role			  	Role 				`gorm:"foreignKey:RoleID"`
	IsBanned          	bool
	IsSubscribed	  	bool
	UnAnsweredQuestion	*int
	WalletBalance		int
	Address				*string
	PhoneNumber			*string
	CreatedAt   		time.Time
	UpdatedAt   		time.Time
	OTPCode				*string
	OTPCreatedAt		*time.Time
	IsLogin				bool
}