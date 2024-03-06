package models

type Seat struct {
	ID             uint `gorm:"primaryKey"`
	FlightTicketID uint
	FlightTicket   FlightTicket `gorm:"foreignKey: FlightTicketID"`
	SeatClass      string
	SeatNumber     string
}