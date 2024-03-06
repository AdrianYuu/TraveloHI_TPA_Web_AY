package controllers

import (
	"fmt"
	"sort"
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func GetHotel(c *gin.Context) {
	var request struct{
		HotelID int
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var hotel models.Hotel
	result := config.DB.Preload("HotelPictures").
						Preload("HotelFacilities").
						Preload("Rooms").
						Preload("Rooms.RoomPictures").
						Preload("Rooms.RoomFacilities").
						Preload("Rooms.RoomType").
						Preload("HotelReviews").
						Preload("HotelReviews.HotelRatings").
						Preload("HotelReviews.HotelRatings.HotelRatingType").
						Preload("Country").
						First(&hotel, "ID = ?", request.HotelID)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting hotel."})
		return
	}

	c.JSON(200, hotel)
}

func GetHotels(c *gin.Context) {
	var hotels []models.Hotel

	result := config.DB.Preload("HotelPictures").
						Preload("HotelFacilities").
						Preload("Rooms").
						Preload("Rooms.RoomPictures").
						Preload("Rooms.RoomFacilities").
						Preload("Rooms.RoomType").
						Preload("HotelReviews").
						Preload("HotelReviews.HotelRatings").
						Preload("HotelReviews.HotelRatings.HotelRatingType").
						Preload("Country").
						Find(&hotels)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting hotels."})
		return
	}

	c.JSON(200, hotels)
}

func GetHotelsByCountryName(c *gin.Context){
	var request struct{
		CountryName string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	fmt.Println(request.CountryName)

	var hotels []models.Hotel
	result := config.DB.Preload("HotelPictures").
						Preload("HotelFacilities").
						Preload("Rooms").
						Preload("Rooms.RoomPictures").
						Preload("Rooms.RoomFacilities").
						Preload("Rooms.RoomType").
						Preload("HotelReviews").
						Preload("HotelReviews.HotelRatings").
						Preload("HotelReviews.HotelRatings.HotelRatingType").
						Preload("Country").
						Joins("JOIN countries ON hotels.country_id = countries.id").
						First(&hotels, "countries.country_name = ?", request.CountryName)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting hotel."})
		return
	}

	c.JSON(200, hotels)
}

func CreateHotel(c *gin.Context) {
	var hotel models.Hotel

	if err := c.Bind(&hotel); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(hotel.HotelName) == "" {
		c.JSON(400, gin.H{"message": "Hotel name is required."})
		return;
	}

	if strings.TrimSpace(hotel.HotelDescription) == "" {
		c.JSON(400, gin.H{"message": "Hotel description is required."})
		return;
	}

	if strings.TrimSpace(hotel.HotelAddress) == "" {
		c.JSON(400, gin.H{"message": "Hotel address is required."})
		return;
	}

	if strings.TrimSpace(hotel.HotelStar) == "" {
		c.JSON(400, gin.H{"message": "Hotel star is required."})
		return;
	}

	if !util.IsNumericStr(hotel.HotelStar) {
		c.JSON(400, gin.H{"message": "Hotel star must be a number."})
		return;
	}

	if util.StringToInt(hotel.HotelStar) < 1 || util.StringToInt(hotel.HotelStar) > 5 {
		c.JSON(400, gin.H{"message": "Hotel star must be between 1 - 5."})
		return;
	}

	if hotel.CountryID == 0 {
		c.JSON(400, gin.H{"message": "Country is required."})
		return;
	}

	if len(hotel.HotelFacilities) == 0 {
		c.JSON(400, gin.H{"message": "At least one hotel facility must be selected."})
		return;
	}

	if *hotel.HotelPictureLength == 0 {
		c.JSON(400, gin.H{"message": "At least one hotel picture is required."})
		return;
	}

	if *hotel.HotelPictureLength > 7 {
		c.JSON(400, gin.H{"message": "Seven picture is the maximum capacity."})
		return;
	}

	result := config.DB.Create(&hotel)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating hotel."})
		return
	}

	c.JSON(200, gin.H{"HotelID": hotel.ID})
}

func GetTopFiveHotels(c *gin.Context) {
    var hotels []models.Hotel

    result := config.DB.Preload("Rooms").
						Preload("HotelPictures").
						Find(&hotels)

    if result.Error != nil {
        c.JSON(500, gin.H{"message": "Error getting hotels."})
        return
    }

    hotelBookingCounts := make(map[uint]int)
	var hotelBookings []struct {
		HotelID     uint
		BookingCount int
	}

	config.DB.Table("hotel_bookings").
		Joins("JOIN rooms ON hotel_bookings.room_id = rooms.id").
		Joins("JOIN hotels ON rooms.hotel_id = hotels.id").
		Select("hotels.id as hotel_id, count(*) as booking_count").
		Group("hotels.id").
		Scan(&hotelBookings)

	for _, booking := range hotelBookings {
		hotelBookingCounts[booking.HotelID] = booking.BookingCount
	}
	
	fmt.Println(hotelBookings)

	sort.SliceStable(hotels, func(i, j int) bool {
		return hotelBookingCounts[hotels[i].ID] > hotelBookingCounts[hotels[j].ID]
	})

	var topFiveHotels []models.Hotel
	if len(hotels) > 5 {
		topFiveHotels = hotels[:5]
	} else {
		topFiveHotels = hotels
	}

	c.JSON(200, topFiveHotels)
}

