package controllers

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"gopkg.in/gomail.v2"
)

const HOST = "smtp.gmail.com"
const PORT = 587
const EMAIL = "travelohi.website@gmail.com"
const PASSWORD = "elji tgmc ljmp ozvh"

func SendWelcomeEmail(emailReceiver string) {
	m := gomail.NewMessage()
	m.SetHeader("From", "travelohi.website@gmail.com")
	m.SetHeader("To", emailReceiver)
	m.SetHeader("Subject", "Welcome to TraveloHI")
	m.SetBody("text/html", "Thank you for registering to TraveloHI. Hope you have a good day!")

	d := gomail.NewDialer(HOST, PORT, EMAIL, PASSWORD)
	d.DialAndSend(m)
}

func SendOTPEmail(emailReceiver string, OTPCode string){
	m := gomail.NewMessage()
	m.SetHeader("From", "travelohi.website@gmail.com")
	m.SetHeader("To", emailReceiver)
	m.SetHeader("Subject", "TraveloHI OTP Code")
	m.SetBody("text/html", "This is your OTP Code " + OTPCode + ". Please use it wisely!")

	d := gomail.NewDialer(HOST, PORT, EMAIL, PASSWORD)
	d.DialAndSend(m)
}

func SendPaymentEmail(emailReceiver string, message string){
	m := gomail.NewMessage()
	m.SetHeader("From", "travelohi.website@gmail.com")
	m.SetHeader("To", emailReceiver)
	m.SetHeader("Subject", "TraveloHI Payment Information")
	m.SetBody("text/html", message)

	d := gomail.NewDialer(HOST, PORT, EMAIL, PASSWORD)
	d.DialAndSend(m)
}

func SendBroadcastEmail(broadcast models.Broadcast){
	emails := GetAllSubscribedEmails()
	m := gomail.NewMessage()
	d := gomail.NewDialer(HOST, PORT, EMAIL, PASSWORD)

	for _, email := range emails {
		m.SetHeader("From", "travelohi.website@gmail.com")
		m.SetHeader("To", email)
		m.SetHeader("Subject", broadcast.Title)
		m.SetBody("text/html", broadcast.Message)
		d.DialAndSend(m)
	}
}