package controllers

import (
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *gin.Context) {
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

	if util.IsEmailExists(user.Email) {
		c.JSON(400, gin.H{"message": "Email already exists."})
		return;
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

	if strings.TrimSpace(user.Password) == "" {
		c.JSON(400, gin.H{"message": "Password is required."})
		return
	}

	if len(user.Password) < 8 || len(user.Password) > 30 {
		c.JSON(400, gin.H{"message": "Password length must be 8 - 30 characters."})
		return
	}

	if !util.IsValidPassword(user.Password) {
		c.JSON(400, gin.H{"message": "Password must only contain capital letters, lower-case letters, numbers, and special symbols."})
		return
	}

	if strings.TrimSpace(user.ConfirmPassword) == "" {
		c.JSON(400, gin.H{"message": "Confirm password is required."})
		return
	}

	if user.Password != user.ConfirmPassword {
		c.JSON(400, gin.H{"message": "Confirm password must be the same like the password."})
		return
	}

	if user.Gender == "" {
		c.JSON(400, gin.H{"message": "Gender is required."})
		return
	}

	if user.Gender != "Female" && user.Gender != "Male" {
		c.JSON(400, gin.H{"message": "Gender must be Male or Female."})
		return
	}

	if user.ProfilePictureURL == "" {
		c.JSON(400, gin.H{"message": "Profile picture is required."})
		return
	}

	if *user.UnAnsweredQuestion > 0 {
		c.JSON(400, gin.H{"message": "All personal's question answer is required."})
		return
	}

	hashedPassword, err := util.HashPassword(user.Password)
	if err != nil {
		c.JSON(500, gin.H{"message": "Error hashing password."})
		return
	}
	user.Password = hashedPassword

	hashedPassword, err = util.HashPassword(user.ConfirmPassword)
	if err != nil {
		c.JSON(500, gin.H{"message": "Error hashing password."})
		return
	}
	user.ConfirmPassword = hashedPassword

	result := config.DB.Create(&user)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating user."})
		return
	}

	SendWelcomeEmail(user.Email)
	c.JSON(200, gin.H{"UserID": user.ID})
}

func Login(c *gin.Context){
	var request struct {
		Email 		string
		Password 	string
	}
	
	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if !util.IsEmailExists(request.Email) {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "email = ? AND is_banned = FALSE AND is_login = FALSE", request.Email)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "Failed to login."})
		return
	}

	user.IsLogin = true;
	config.DB.Save(&user);

	err := util.CompareHashAndPassword([]byte(user.Password), []byte(request.Password));
	if err != nil {
		c.JSON(400, gin.H{"message": "Wrong password."})
		return
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"UserID": user.ID,
		"ExpiredDate": time.Now().Add(time.Hour * 24 * 30).Unix(),
	})

	tokenString, err := token.SignedString([]byte(os.Getenv("SECRET_KEY")))
	if err != nil {
		c.JSON(400, gin.H{"message": "Failed to create token."})
		return
	}

	c.SetSameSite(http.SameSiteLaxMode)
	c.SetCookie("JWT", tokenString, 3600 * 24 * 30, "", "", false, true)

	c.JSON(200, user)
}

func Logout(c *gin.Context) {
	var request struct{
		UserID uint
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "id = ?", request.UserID)
	if result.Error != nil {
		c.JSON(400, gin.H{"message": "Failed to login."})
		return
	}

	user.IsLogin = false
	config.DB.Save(&user)

    c.SetCookie("JWT", "", -1, "", "", false, true)
    c.JSON(200, gin.H{"message": "Successfully logged out."})
}

func CheckEmailExists(c *gin.Context) {
	var request struct {
		Email string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if util.IsEmailExists(request.Email) {
		c.JSON(200, gin.H{"message": true})
	} else {
		c.JSON(200, gin.H{"message": false})
	}
}

func CheckEmailFormat(c *gin.Context){
	var request struct {
		Email string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if util.IsEmailFormatValid(request.Email) {
		c.JSON(200, gin.H{"message": true})
	} else {
		c.JSON(200, gin.H{"message": false})
	}
}

func ChangePassword(c *gin.Context){
	var request struct {
		Email string
		Password string
		ConfirmPassword string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(request.Password) == "" || strings.TrimSpace(request.ConfirmPassword) == "" {
		c.JSON(400, gin.H{"message": "Password and confirm password can't be empty."})
		return
	}

	if len(request.Password) < 8 || len(request.Password) > 30{
		c.JSON(400, gin.H{"message": "Password length must be 8 - 30 characters."})
		return
	}

	if !util.IsValidPassword(request.Password) {
		c.JSON(400, gin.H{"message": "Password must only contain capital letters, lower-case letters, numbers, and special symbols."})
		return
	}

	if(request.Password != request.ConfirmPassword){
		c.JSON(400, gin.H{"message": "Password and confirm password must match."})
		return
	}

	hashedPassword, err := util.HashPassword(request.Password)
	if err != nil {
		c.JSON(500, gin.H{"message": "Error hashing password."})
		return
	}

	var user models.User
	result := config.DB.First(&user, "email = ?", request.Email)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password))
	if err == nil {
		c.JSON(400, gin.H{"message": "Can't use the old password."})
		return
	}

	user.Password = hashedPassword

	config.DB.Save(&user)
	c.JSON(200, gin.H{"message": "Successfully changed password."})
}

func GetCurrentUser(c *gin.Context){
	user, _ := c.Get("user")
	c.JSON(200, user)
}