package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func CreateHotelBooking(c *gin.Context) {
	var hotelBooking models.HotelBooking

	if err := c.Bind(&hotelBooking); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if hotelBooking.RoomID == 0 {
		c.JSON(400, gin.H{"message": "Room is required."})
		return
	}

	if hotelBooking.CheckInDate == ""{
		c.JSON(400, gin.H{"message": "Check in date can't be empty."})
		return
	}

	if hotelBooking.CheckOutDate == ""{
		c.JSON(400, gin.H{"message": "Check out date can't be empty."})
		return
	}

	if !util.IsFinishAfterStartWOTime(hotelBooking.CheckInDate, hotelBooking.CheckOutDate) {
		c.JSON(400, gin.H{"message": "Check out date must be after check in date."})
		return
	}

	var existingBookings []models.HotelBooking
	result := config.DB.Where("room_id = ? AND ((check_in_date BETWEEN ? AND ?) OR (check_out_date BETWEEN ? AND ?))",
		hotelBooking.RoomID, hotelBooking.CheckInDate, hotelBooking.CheckOutDate, hotelBooking.CheckInDate, hotelBooking.CheckOutDate).Find(&existingBookings)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error checking existing bookings."})
		return
	}

	if len(existingBookings) > 0 {
		c.JSON(400, gin.H{"message": "There are overlapping bookings for the selected room."})
		return
	}

	result = config.DB.Create(&hotelBooking)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating hotel booking."})
		return
	}

	c.JSON(200, gin.H{"message": "Success create hotel booking."})
}

func GetHotelBookingsUnpaid(c *gin.Context) {
	var request struct{
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var hotelBookings []models.HotelBooking
	result := config.DB.Where("user_id = ? AND status = ?", request.UserID, "Unpaid").
											Preload("Room").
											Preload("Room.RoomPictures").
											Preload("Room.RoomType").
											Preload("Room.Hotel").
											Order("ID").
											Find(&hotelBookings)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting hotel bookings."})
		return
	}

	c.JSON(200, hotelBookings)
}

func GetHotelBookingsPaid(c *gin.Context) {
	var request struct{
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var hotelBookings []models.HotelBooking
	result := config.DB.Where("user_id = ? AND status = ?", request.UserID, "Paid").
											Preload("Room").
											Preload("Room.RoomPictures").
											Preload("Room.RoomType").
											Preload("Room.Hotel").
											Order("ID").
											Find(&hotelBookings)

	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting hotel bookings."})
		return
	}

	c.JSON(200, hotelBookings)
}

func UpdateHotelBooking(c *gin.Context){
	var request struct{
		ID uint
		CheckInDate string
		CheckOutDate string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if request.CheckInDate == "" {
		c.JSON(400, gin.H{"message": "Check in date is required."})
		return
	}

	if request.CheckOutDate == "" {
		c.JSON(400, gin.H{"message": "Check out date is required."})
		return
	}

	if !util.IsFinishAfterStartWOTime(request.CheckInDate, request.CheckOutDate) {
		c.JSON(400, gin.H{"message": "Check out date must be after check in date."})
		return
	}

	var updatedHotelBooking models.HotelBooking
	result := config.DB.First(&updatedHotelBooking, "ID = ?", request.ID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	updatedHotelBooking.CheckInDate = request.CheckInDate
	updatedHotelBooking.CheckOutDate = request.CheckOutDate
	config.DB.Save(&updatedHotelBooking)
	c.JSON(200, gin.H{"message": "Successfully update hotel booking."})
}

func UpdateHotelBookingStatus(c *gin.Context){
	var request struct {
		HotelBookingID uint
		Status 		   string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if request.HotelBookingID == 0 {
		c.JSON(400, gin.H{"message": "Hotel Booking is required."})
		return
	}

	if strings.TrimSpace(request.Status) == "" {
		c.JSON(400, gin.H{"message": "Status can't be empty."})
		return
	}
	
	var updatedHotelBooking models.HotelBooking
	result := config.DB.First(&updatedHotelBooking, "ID = ?", request.HotelBookingID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	updatedHotelBooking.Status = request.Status
	config.DB.Save(&updatedHotelBooking)
	c.JSON(200, gin.H{"message": "Successfully hotel booking status."})
}

func UpdateHotelBookingReviewStatus(c *gin.Context){
	var request struct {
		HotelBookingID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var hotelBooking models.HotelBooking
	result := config.DB.First(&hotelBooking, "id = ?", request.HotelBookingID)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "Failed to update."})
		return
	}
	hotelBooking.IsReviewed = true;
	config.DB.Save(&hotelBooking)

	c.JSON(200, gin.H{"message": "Successfully hotel booking status."})
}