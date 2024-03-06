package route

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/controllers"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/middleware"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func UserRoute(r *gin.Engine) {
	// Auth
	r.POST("/register", controllers.Register)
	r.POST("/login", controllers.Login)
	r.POST("/login-otp", controllers.LoginOTP)
	r.POST("/logout", controllers.Logout)
	r.POST("/check-email-exists", controllers.CheckEmailExists)
	r.POST("/check-email-format", controllers.CheckEmailFormat)
	r.POST("/create-otp", controllers.CreateAndSendOTP)
	r.PUT("/change-password", controllers.ChangePassword)

	// User
	r.GET("/get-users", middleware.RequireAuth, controllers.GetUsers)
	r.POST("/ban-user", middleware.RequireAuth, controllers.BanUser)
	r.POST("/unban-user", middleware.RequireAuth, controllers.UnBanUser)
	r.PUT("/update-user", middleware.RequireAuth, controllers.UpdateUser)
	r.POST("/get-user-id-by-email", controllers.GetUserIDByEmail)
	r.GET("/get-current-user", middleware.RequireAuth, controllers.GetCurrentUser)

	// Credit Card
	r.POST("/get-credit-cards", middleware.RequireAuth, controllers.GetCreditCards)
	r.POST("/create-credit-card", middleware.RequireAuth, controllers.CreateCreditCard)

	// Wallet
	r.PUT("/update-wallet", middleware.RequireAuth, controllers.UpdateWallet)

	// Point
	r.PUT("/update-point", middleware.RequireAuth, controllers.UpdatePoint)

	// Broadcast
	r.POST("/send-broadcast", middleware.RequireAuth, controllers.SendBroadcast)

	// Promo Code
	r.POST("/check-promo-code-exists", middleware.RequireAuth, controllers.CheckPromoCodeExists)
	r.POST("/create-promo", controllers.CreatePromo)
	r.GET("/get-promos", controllers.GetPromos)
	r.POST("/get-promo", middleware.RequireAuth, controllers.GetPromo)
	r.POST("/get-promo-by-promo-code", middleware.RequireAuth, controllers.GetPromoByPromoCode)
	r.PUT("/update-promo", controllers.UpdatePromo)
	r.POST("/check-user-promo", middleware.RequireAuth, controllers.CheckUserPromo)
	r.POST("/use-promo", middleware.RequireAuth, controllers.UsePromo)
	r.DELETE("/delete-promo/:id", controllers.DeletePromo)

	// Airline
	r.GET("/get-airlines", middleware.RequireAuth, controllers.GetAirlines)
	r.POST("/create-airline", middleware.RequireAuth, controllers.CreateAirline)
	r.POST("/check-airline-name-exists", middleware.RequireAuth, controllers.CheckAirlineNameExists)

	// Airplane
	r.GET("/get-airplanes", middleware.RequireAuth, controllers.GetAirplanes)
	r.POST("/create-airplane", middleware.RequireAuth, controllers.CreateAirplane)
	r.POST("/check-airplane-name-exists", middleware.RequireAuth, controllers.CheckAirplaneNameExists)

	// Airport
	r.GET("/get-airports", middleware.RequireAuth, controllers.GetAirports)

	// Flight
	r.POST("/check-flight-code-exists", middleware.RequireAuth, controllers.CheckFlightCodeExists)
	r.POST("/create-flight", middleware.RequireAuth, controllers.CreateFlight)
	r.GET("/get-flights", middleware.RequireAuth, controllers.GetFlights)
	r.POST("/get-flight", middleware.RequireAuth, controllers.GetFlight)
	r.GET("/get-flights-top-5", middleware.RequireAuth, controllers.GetTopFiveFlights)
	r.POST("/get-flights-by-country-name", middleware.RequireAuth, controllers.GetFlightsByCountryName)

	// Flight Ticket
	r.POST("/create-flight-ticket", middleware.RequireAuth, controllers.CreateFlightTicket)
	r.POST("/get-flight-tickets-unpaid", middleware.RequireAuth, controllers.GetFlightTicketsUnpaid)
	r.POST("/get-flight-tickets-paid", middleware.RequireAuth, controllers.GetFlightTicketsPaid)
	r.POST("/update-flight-ticket-status", middleware.RequireAuth, controllers.UpdateFlightTicketStatus)

	// Hotel Booking
	r.POST("/create-hotel-booking", middleware.RequireAuth, controllers.CreateHotelBooking)
	r.POST("/get-hotel-bookings-unpaid", middleware.RequireAuth, controllers.GetHotelBookingsUnpaid)
	r.POST("/get-hotel-bookings-paid", middleware.RequireAuth, controllers.GetHotelBookingsPaid)
	r.PUT("/update-hotel-booking", middleware.RequireAuth, controllers.UpdateHotelBooking)
	r.POST("/update-hotel-booking-status", middleware.RequireAuth, controllers.UpdateHotelBookingStatus)
	r.POST("/create-hotel-review", middleware.RequireAuth, controllers.CreateHotelReview)	
	r.POST("/create-hotel-rating", middleware.RequireAuth, controllers.CreateHotelRating)
	r.POST("/update-hotel-booking-review-status", middleware.RequireAuth, controllers.UpdateHotelBookingReviewStatus)

	// Flight Seat
	r.POST("/create-seat", middleware.RequireAuth, controllers.CreateSeat)

	// Pay
	r.POST("/pay-using-wallet", middleware.RequireAuth, controllers.PayUsingWallet)
	r.POST("/pay-using-credit-card", middleware.RequireAuth, controllers.PayUsingCreditCard)
	r.POST("/send-payment-email", middleware.RequireAuth, controllers.SendPaymentEmailToUser)

	// Hotel
	r.GET("/get-hotels", middleware.RequireAuth, controllers.GetHotels)
	r.POST("/get-hotel", middleware.RequireAuth, controllers.GetHotel)
	r.POST("/create-hotel", middleware.RequireAuth, controllers.CreateHotel)
	r.GET("/get-hotels-top-5", middleware.RequireAuth, controllers.GetTopFiveHotels)
	r.POST("/get-hotels-by-country-name", middleware.RequireAuth, controllers.GetHotelsByCountryName)

	// Hotel Picture
	r.POST("/create-hotel-picture", middleware.RequireAuth, controllers.CreateHotelPicture)

	// Hotel Facilities
	r.GET("/get-hotel-facilities", middleware.RequireAuth, controllers.GetHotelFacilities)

	// Hotel Rooms
	r.POST("/create-room", middleware.RequireAuth, controllers.CreateRoom)
	r.GET("/get-rooms", middleware.RequireAuth, controllers.GetRooms)

	// Room Facilities
	r.GET("/get-room-facilities", middleware.RequireAuth, controllers.GetRoomFacilities)

	// Room Type
	r.GET("/get-room-types", middleware.RequireAuth, controllers.GetRoomTypes)

	// Room Picture
	r.POST("/create-room-picture", middleware.RequireAuth, controllers.CreateRoomPicture)

	// Airport Transit
	r.POST("/create-airport-transit", middleware.RequireAuth, controllers.CreateAirportTransit)

	// Personal Question
	r.GET("/get-personal-questions", controllers.GetPersonalQuestions)
	r.POST("/get-personal-questions-by-email", controllers.GetPersonalQuestionsByEmail)
	r.POST("/create-personal-answers", controllers.CreatePersonalAnswer)
	r.POST("/check-personal-answers", controllers.CheckPersonalAnswer)

	// Search History
	r.POST("/get-search-history", middleware.RequireAuth, controllers.GetSearchHistory)
	r.POST("/create-search-history", middleware.RequireAuth, controllers.CreateSearchHistory)
	r.GET("/get-top-5-search-history", middleware.RequireAuth, controllers.GetTop5SearchHistory)

	// Country
	r.GET("/get-countries", middleware.RequireAuth, controllers.GetCountries)
	
	// Other
	r.GET("/api/validate", middleware.RequireAuth)
}

func SwaggerRoute(r *gin.Engine){
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
}

func InitRoutes(r *gin.Engine) {
	UserRoute(r)
	SwaggerRoute(r)
}