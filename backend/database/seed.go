package database

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
)

func RoleSeed(){
	roles := []models.Role{
		{	
			Name: "Admin",
		},
		{	
			Name: "User",
		},
	}

	config.DB.Create(&roles)
}

func PersonalQuestionSeed(){
	personalQuestions := []models.PersonalQuestion{
		{
			Question: "What is your favorite childhood pet's name?",
		},
		{
			Question: "In which city where you born?",
		},
		{
			Question: "What is the name of your favorite book or movie?",
		},
		{
			Question: "What is the name of the elementary school you attended?",
		},
		{
			Question: "What is the model of your first car?",
		},
	}

	config.DB.Create(&personalQuestions)
}

func AdminSeed(){
	hashedPassword, _ := util.HashPassword("admin123")
	user := models.User{
		FirstName: "Admin",
		LastName: "Admin",
		Email: "admin@gmail.com",
		DateOfBirth: "2004-10-01",
		Password: hashedPassword,
		ConfirmPassword: hashedPassword,
		Gender: "Male",
		ProfilePictureURL: "https://firebasestorage.googleapis.com/v0/b/travelohi-89d78.appspot.com/o/ProfilePicture%2F1706358090264_EzVkJ1gUYAAoLxZ.jpg?alt=media&token=419b9e13-4ada-4722-bb50-894790485e5f",
		RoleID: 1,
		Points: 9999,
		IsBanned: false,
		IsSubscribed: false,
		WalletBalance: 0,
		IsLogin: false,
	}

	config.DB.Create(&user)
}

func UserSeed(){
	hashedPassword, _ := util.HashPassword("adrianyu")
	user := models.User{
		FirstName: "Adrian",
		LastName: "Yuuuuuuuu",
		Email: "adrianyuu01@gmail.com",
		DateOfBirth: "2004-10-01",
		Password: hashedPassword,
		ConfirmPassword: hashedPassword,
		Gender: "Male",
		ProfilePictureURL: "https://firebasestorage.googleapis.com/v0/b/travelohi-89d78.appspot.com/o/ProfilePicture%2F1706358090264_EzVkJ1gUYAAoLxZ.jpg?alt=media&token=419b9e13-4ada-4722-bb50-894790485e5f",
		RoleID: 2,
		Points: 1000,
		IsBanned: false,
		IsSubscribed: true,
		WalletBalance: 0,
		IsLogin: false,
	}

	config.DB.Create(&user)
}

func CountrySeed(){
	countries := []models.Country{
		{
			CountryName: "Indonesia",
		},
		{
			CountryName: "United_States",
		},
		{
			CountryName: "China",
		},
		{
			CountryName: "India",
		},
		{
			CountryName: "Brazil",
		},
		{
			CountryName: "Russia",
		},
		{
			CountryName: "Japan",
		},
		{
			CountryName: "Mexico",
		},
		{
			CountryName: "Germany",
		},
		{
			CountryName: "France",
		},
		{
			CountryName: "Canada",
		},
		{
			CountryName: "Finland",
		},
		{
			CountryName: "United-Kingdom",
		},
	}

	config.DB.Create(&countries)
}

func CitySeed() {
	cities := []models.City{
		{
			CountryID: 1,
			CityName:   "Palembang",
		},
		{
			CountryID: 1,
			CityName:   "Jakarta",
		},
		{
			CountryID: 2,
			CityName:   "New York",
		},
		{
			CountryID: 2,
			CityName:   "Los Angeles",
		},
		{
			CountryID: 3,
			CityName:   "Beijing",
		},
		{
			CountryID: 3,
			CityName:   "Shanghai",
		},
		{
			CountryID: 4,
			CityName:   "Mumbai",
		},
		{
			CountryID: 4,
			CityName:   "Delhi",
		},
		{
			CountryID: 5,
			CityName:   "Sao Paulo",
		},
		{
			CountryID: 5,
			CityName:   "Rio de Janeiro",
		},
		{
			CountryID: 6,
			CityName:   "Moscow",
		},
		{
			CountryID: 6,
			CityName:   "Saint Petersburg",
		},
		{
			CountryID: 7,
			CityName:   "Tokyo",
		},
		{
			CountryID: 7,
			CityName:   "Osaka",
		},
		{
			CountryID: 8,
			CityName:   "Mexico City",
		},
		{
			CountryID: 8,
			CityName:   "Guadalajara",
		},
		{
			CountryID: 9,
			CityName:   "Berlin",
		},
		{
			CountryID: 9,
			CityName:   "Munich",
		},
		{
			CountryID: 10,
			CityName:   "Paris",
		},
		{
			CountryID: 10,
			CityName:   "Marseille",
		},
		{
			CountryID: 11,
			CityName:   "Toronto",
		},
		{
			CountryID: 12,
			CityName:   "Helsinki",
		},
		{
			CountryID: 13,
			CityName:   "Birmingham",
		},
	}

	config.DB.Create(&cities)
}

func AirportSeed(){
	airports := []models.Airport{
		{
			CityID: 1,
			AirportCode: "PLM",
			AirportName: "Sultan Mahmud Badaruddin II International Airport",
		},
		{
			CityID:      2,
			AirportCode: "CGK",
			AirportName: "Soekarno-Hatta International Airport",
		},
		{
			CityID:      3,
			AirportCode: "JFK",
			AirportName: "John F. Kennedy International Airport",
		},
		{
			CityID:      5,
			AirportCode: "PEK",
			AirportName: "Beijing Capital International Airport",
		},
		{
			CityID:      8,
			AirportCode: "DEL",
			AirportName: "Indira Gandhi International Airport",
		},
		{
			CityID:      10,
			AirportCode: "GIG",
			AirportName: "Rio de Janeiro International Airport",
		},
		{
			CityID:      11,
			AirportCode: "LED",
			AirportName: "Pulkovo Airport",
		},
		{
			CityID:      13,
			AirportCode: "NRT",
			AirportName: "Narita International Airport",
		},
		{
			CityID:      15,
			AirportCode: "MEX",
			AirportName: "Benito Juárez International Airport",
		},
		{
			CityID:      18,
			AirportCode: "MUC",
			AirportName: "Munich Airport",
		},
		{
			CityID:      20,
			AirportCode: "MRS",
			AirportName: "Marseille Provence Airport",
		},
		{
			CityID:      21,
			AirportCode: "TOR",
			AirportName: "Toronto Airport",
		},
		{
			CityID:      22,
			AirportCode: "HEL",
			AirportName: "Helsinki Airport",
		},
		{
			CityID:      23,
			AirportCode: "BIR",
			AirportName: "Birmingham Airport",
		},
	}

	config.DB.Create(&airports)
}

func HotelFacilitySeed(){
	hotelFacilities := []models.HotelFacility{
		{
			FacilityName: "Swimming Pool",
		},
		{
			FacilityName: "Restaurant",
		},
		{
			FacilityName: "WiFi",
		},
		{
			FacilityName: "24-Hour Front Desk",
		},
		{
			FacilityName: "Free Parking",
		},
		{
			FacilityName: "Elevator",
		},
		{
			FacilityName: "Escalator",
		},
		{
			FacilityName: "Garden",
		},
	}

	config.DB.Create(&hotelFacilities)
}

func RoomTypeSeed(){
	roomTypes := []models.RoomType {
		{
			RoomTypeName: "Regular",
		},
		{
			RoomTypeName: "Deluxe Suite",
		},
		{
			RoomTypeName: "Executive Loft",
		},
	}

	config.DB.Create(&roomTypes)
}

func RoomFacilitySeed(){
	roomFacilities := []models.RoomFacility {
		{
			FacilityName: "Shower",
		},
		{
			FacilityName: "Coffee Maker",
		},
		{
			FacilityName: "Hair Dryer",
		},
		{
			FacilityName: "Balcony",
		},
		{
			FacilityName: "In-room Safe",
		},
	}

	config.DB.Create(&roomFacilities)
}

func HotelRatingTypeSeed(){
	hotelRatingTypes := []models.HotelRatingType {
		{
			HotelRatingTypeName: "Cleanliness",
		},
		{
			HotelRatingTypeName: "Comfort",
		},
		{
			HotelRatingTypeName: "Location",
		},
		{
			HotelRatingTypeName: "Service",
		},
	}

	config.DB.Create(&hotelRatingTypes)
}

func Seed() {
	RoleSeed()
	PersonalQuestionSeed()
	AdminSeed()
	UserSeed()
	CountrySeed()
	CitySeed()
	AirportSeed()
	HotelFacilitySeed()
	RoomTypeSeed()
	RoomFacilitySeed()
	HotelRatingTypeSeed()
}