package controllers

import (
	"fmt"
	"strings"
	"time"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

func GetUsers(c *gin.Context){
	var users []models.User

	result := config.DB.Find(&users)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting users."})
		return
	}

	c.JSON(200, users)
}

func GetAllSubscribedEmails()[]string{
	var users []models.User
	
	result := config.DB.Where("is_subscribed = TRUE").Select("email").Find(&users)
	if result.Error != nil {
		fmt.Println("Error getting email.")
		return nil
	}
	
	var emails []string
	for _, user := range users {
		emails = append(emails, user.Email)
	}

	return emails
}

func BanUser(c *gin.Context){
	var request struct{
		UserID int
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "ID = ?", request.UserID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	user.IsBanned = true;
	config.DB.Save(&user)
	c.JSON(200, gin.H{"message": "Successfully banned user."})
}

func UnBanUser(c *gin.Context){
	var request struct{
		UserID int
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "ID = ?", request.UserID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	user.IsBanned = false;
	config.DB.Save(&user)
	c.JSON(200, gin.H{"message": "Successfully unbanned user."})
}

func UpdateUser(c *gin.Context){
	var user models.User
	if err := c.Bind(&user); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(user.FirstName) == "" {
		c.JSON(400, gin.H{"message": "First Name is required."})
		return
	}

	if len(user.FirstName) <= 5{
		c.JSON(400, gin.H{"message": "First name must be more than 5 characters."})
		return
	}

	if !util.IsAlphabetical(user.FirstName) {
		c.JSON(400, gin.H{"message": "First name must only contain alphabet."})
		return
	}

	if strings.TrimSpace(user.LastName) == "" {
		c.JSON(400, gin.H{"message": "Last Name is required."})
		return
	} 

	if len(user.LastName) <= 5{
		c.JSON(400, gin.H{"message": "Last name must be more than 5 characters."})
		return
	}

	if strings.TrimSpace(user.LastName) == "" {
		c.JSON(400, gin.H{"message": "Last Name is required."})
		return
	}

	if strings.TrimSpace(user.Email) == "" {
		c.JSON(400, gin.H{"message": "Email is required."})
		return
	}

	if !util.IsEmailFormatValid(user.Email) {
		c.JSON(400, gin.H{"message": "Email format must be [email name]@[domain].com"})
		return;
	}

	existingUser := models.User{}
    if err := config.DB.Where("email = ?", user.Email).First(&existingUser).Error; err == nil {
        if existingUser.ID != user.ID {
            c.JSON(400, gin.H{"message": "Email already exists."})
            return
        }
    }

	if user.DateOfBirth == "" {
		c.JSON(400, gin.H{"message": "Date of birth is required."})
		return;
	}

	dob, _ := time.Parse("2006-01-02", user.DateOfBirth)
	currentDate := time.Now()

	if dob.After(currentDate) {
		c.JSON(400, gin.H{"message": "Date of birth cannot pass current date."})
		return
	}

	if util.GetAge(user.DateOfBirth) < 13 {
		c.JSON(400, gin.H{"message": "You must be more than or equals to 13 years old."})
		return;
	}

	if user.Gender == "" {
		c.JSON(400, gin.H{"message": "Gender is required."})
		return
	}

	if strings.TrimSpace(*user.Address) == "" {
		c.JSON(400, gin.H{"message": "Address is required."})
		return
	}

	if strings.TrimSpace(*user.PhoneNumber) == "" {
		c.JSON(400, gin.H{"message": "Phone number is required."})
		return
	} 

	if !util.IsNumericStr(*user.PhoneNumber) {
		c.JSON(400, gin.H{"message": "Phone number must be numeric."})
		return
	}

	var updatedUser models.User
	result := config.DB.First(&updatedUser, "ID = ?", user.ID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}
	
	updatedUser = user
	fmt.Println(updatedUser)
	config.DB.Save(&updatedUser)
	c.JSON(200, gin.H{"message": "Successfully update user."})
}

func GetUserIDByEmail(c *gin.Context){
	var request struct{
		Email string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "email = ? AND is_banned = FALSE", request.Email)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "Failed to get user."})
		return
	}
	
	c.JSON(200, gin.H{"UserID": user.ID})
}
