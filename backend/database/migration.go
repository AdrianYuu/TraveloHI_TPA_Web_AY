package database

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"gorm.io/gorm"
)

func DropAllTables(db *gorm.DB){
	db.Migrator().DropTable(&models.UserPromo{})
	db.Migrator().DropTable(&models.Promo{})
	db.Migrator().DropTable(&models.FlightTicket{})
	db.Migrator().DropTable(&models.Seat{})
	db.Migrator().DropTable(&models.HotelPicture{})
	db.Migrator().DropTable(&models.HotelBooking{})
	db.Migrator().DropTable(&models.AirportTransit{})
	db.Migrator().DropTable(&models.Flight{})
	db.Migrator().DropTable(&models.HotelFacility{})
	db.Migrator().DropTable(&models.Hotel{})
	db.Migrator().DropTable(&models.Airplane{})
	db.Migrator().DropTable(&models.Airline{})
	db.Migrator().DropTable(&models.Airport{})
	db.Migrator().DropTable(&models.City{})
	db.Migrator().DropTable(&models.Country{})
	db.Migrator().DropTable(&models.Room{})
	db.Migrator().DropTable(&models.RoomPicture{})
	db.Migrator().DropTable(&models.RoomFacility{})
	db.Migrator().DropTable(&models.RoomType{})
	db.Migrator().DropTable(&models.HotelReview{})
	db.Migrator().DropTable(&models.HotelRating{})
	db.Migrator().DropTable(&models.HotelRatingType{})
	db.Migrator().DropTable(&models.PersonalAnswer{})
	db.Migrator().DropTable(&models.PersonalQuestion{})
	db.Migrator().DropTable(&models.CreditCard{})
	db.Migrator().DropTable(&models.SearchHistory{})
	db.Migrator().DropTable(&models.Role{})
	db.Migrator().DropTable(&models.User{})
	db.Migrator().DropTable("hotel_facility_relation")
	db.Migrator().DropTable("room_facility_relation")
}

func MigrateAllTables(db *gorm.DB){
	db.AutoMigrate(&models.Country{})
	db.AutoMigrate(&models.City{})
	db.AutoMigrate(&models.Airport{})
	db.AutoMigrate(&models.Airline{})
	db.AutoMigrate(&models.Airplane{})
	db.AutoMigrate(&models.RoomType{})
	db.AutoMigrate(&models.Room{})
	db.AutoMigrate(&models.RoomFacility{})
	db.AutoMigrate(&models.RoomPicture{})
	db.AutoMigrate(&models.Flight{})
	db.AutoMigrate(&models.AirportTransit{})
	db.AutoMigrate(&models.Hotel{})
	db.AutoMigrate(&models.HotelFacility{})
	db.AutoMigrate(&models.HotelBooking{})
	db.AutoMigrate(&models.HotelPicture{})
	db.AutoMigrate(&models.FlightTicket{})
	db.AutoMigrate(&models.Seat{})
	db.AutoMigrate(&models.HotelRatingType{})
	db.AutoMigrate(&models.HotelRating{})
	db.AutoMigrate(&models.HotelReview{})
	db.AutoMigrate(&models.PersonalQuestion{})
	db.AutoMigrate(&models.PersonalAnswer{})
	db.AutoMigrate(&models.Promo{})
	db.AutoMigrate(&models.Role{})
	db.AutoMigrate(&models.User{})
	db.AutoMigrate(&models.CreditCard{})
	db.AutoMigrate(&models.SearchHistory{})
	db.AutoMigrate(&models.UserPromo{})
}

func Migrate() {
	DropAllTables(config.DB)
	MigrateAllTables(config.DB)
}
