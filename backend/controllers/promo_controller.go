package controllers

import (
	"strconv"
	"strings"
	"time"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/util"
	"github.com/gin-gonic/gin"
)

// GetPromos List all promos
// @Summary List all promos
// @Produce  json
// @Success 200 {object} models.Promo
// @Router /get-promos [get]
func GetPromos(c *gin.Context){
	var promos []models.Promo

	result := config.DB.Find(&promos)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting promos."})
		return
	}

	c.JSON(200, promos)
}

func GetPromo(c *gin.Context){
	var request struct{
		PromoID int
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var promo models.Promo
	result := config.DB.First(&promo, "ID = ?", request.PromoID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	c.JSON(200, promo)
}

func GetPromoByPromoCode(c *gin.Context){
	var request struct{
		PromoCode string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var promo models.Promo
	result := config.DB.First(&promo, "promo_code = ?", request.PromoCode)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	startDate, err := time.Parse("2006-01-02 15:04", promo.StartDate)
	if err != nil {
		c.JSON(500, gin.H{"message": "Internal server error."})
		return
	}

	finishDate, err := time.Parse("2006-01-02 15:04", promo.FinishDate)
	if err != nil {
		c.JSON(500, gin.H{"message": "Internal server error."})
		return
	}

	currentTime := time.Now()
	if !currentTime.After(startDate) || !currentTime.Before(finishDate) {
		c.JSON(400, gin.H{"message": "Promo is not yet started."})
		return
	}

	c.JSON(200, promo)
}

// CreatePromo Create new promo
// @Summary Create new promo
// @Description Create a new promo
// @Accept json
// @Produce json
// @Param promo body models.Promo true "Promo Details"
// @Success 200 {object} models.Promo
// @Router /create-promo [post]
func CreatePromo(c *gin.Context){
	var promo models.Promo

	if err := c.Bind(&promo); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(promo.PromoCode) == "" {
		c.JSON(400, gin.H{"message": "Promo code is required."})
		return
	}

	if len(promo.PromoCode) != 6 {
		c.JSON(400, gin.H{"message": "Promo code must be 6 characters."})
		return
	}

	if util.IsPromoCodeExists(promo.PromoCode) {
		c.JSON(400, gin.H{"message": "Promo code already exists."})
		return
	}

	if strings.TrimSpace(promo.PromoDescription) == "" {
		c.JSON(400, gin.H{"message": "Promo description is required."})
		return
	}

	if promo.PromoType == "" {
		c.JSON(400, gin.H{"message": "Promo type is required."})
		return
	}

	if strings.TrimSpace(promo.PromoDiscount) == "" {
		c.JSON(400, gin.H{"message": "Promo discount is required."})
		return
	}

	if !util.IsNumericStr(promo.PromoDiscount){
		c.JSON(400, gin.H{"message": "Promo discount must be numeric."})
		return
	}

	promoDiscount, err := strconv.Atoi(promo.PromoDiscount)
	if err != nil || promoDiscount <= 0 {
		c.JSON(400, gin.H{"message": "Promo discount must be a positive integer."})
		return
	}

	if strings.TrimSpace(promo.StartDate) == "" {
		c.JSON(400, gin.H{"message": "Start date is required."})
		return
	}

	if strings.TrimSpace(promo.FinishDate) == "" {
		c.JSON(400, gin.H{"message": "Finish date is required."})
		return
	}

	if !util.IsFinishAfterStart(promo.StartDate, promo.FinishDate){
		c.JSON(400, gin.H{"message": "Finish date must be after start date is required."})
		return
	}

	if promo.PromoPictureURL == "" {
		c.JSON(400, gin.H{"message": "Promo Picture is required or the picture is in upload process."})
		return
	}

	result := config.DB.Create(&promo)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating promo."})
		return
	}

	c.JSON(200, gin.H{"message": "Successfully created promo."})
}

// UpdatePromo Update new promo
// @Summary Update new promo
// @Description Update a new promo
// @Accept json
// @Produce json
// @Param promo body models.Promo true "Promo Details"
// @Success 200 {object} models.Promo
// @Router /update-promo [put]
func UpdatePromo(c *gin.Context){
	var promo models.Promo
	
	if err := c.Bind(&promo); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if strings.TrimSpace(promo.PromoCode) == "" {
		c.JSON(400, gin.H{"message": "Promo code is required."})
		return
	}

	if len(promo.PromoCode) != 6 {
		c.JSON(400, gin.H{"message": "Promo code must be 6 characters."})
		return
	}

	existingPromo := models.Promo{}
    if err := config.DB.Where("promo_code = ?", promo.PromoCode).First(&existingPromo).Error; err == nil {
        if existingPromo.PromoCode != promo.PromoCode {
            c.JSON(400, gin.H{"message": "Promo code already exists."})
            return
        }
    }

	if strings.TrimSpace(promo.PromoDescription) == "" {
		c.JSON(400, gin.H{"message": "Promo description is required."})
		return
	}

	if promo.PromoType == "" {
		c.JSON(400, gin.H{"message": "Promo type is required."})
		return
	}

	if strings.TrimSpace(promo.PromoDiscount) == "" {
		c.JSON(400, gin.H{"message": "Promo discount is required."})
		return
	}

	if !util.IsNumericStr(promo.PromoDiscount){
		c.JSON(400, gin.H{"message": "Promo discount must be numeric."})
		return
	}

	promoDiscount, err := strconv.Atoi(promo.PromoDiscount)
	if err != nil || promoDiscount <= 0 {
		c.JSON(400, gin.H{"message": "Promo discount must be a positive integer."})
		return
	}

	if strings.TrimSpace(promo.StartDate) == "" {
		c.JSON(400, gin.H{"message": "Start date is required."})
		return
	}

	if strings.TrimSpace(promo.FinishDate) == "" {
		c.JSON(400, gin.H{"message": "Finish date is required."})
		return
	}

	if !util.IsFinishAfterStart(promo.StartDate, promo.FinishDate){
		c.JSON(400, gin.H{"message": "Finish date must be after start date is required."})
		return
	}

	var updatedPromo models.Promo
	result := config.DB.First(&updatedPromo, "ID = ?", promo.ID)
	if result.Error != nil{
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	updatedPromo = promo
	config.DB.Save(&updatedPromo)
	c.JSON(200, gin.H{"message": "Successfully update promo."})
}

// DeletePromo Delete promo
// @Summary Delete promo
// @Description Delete promo
// @Accept json
// @Produce json
// @Param id path int true "Promo ID"
// @Success 200 {object} models.Promo
// @Router /delete-promo/{id} [delete]
func DeletePromo(c *gin.Context){
    id := c.Param("id")
    
    var deletedPromo models.Promo
    result := config.DB.First(&deletedPromo, "ID = ?", id)
    if result.Error != nil{
        c.JSON(400, gin.H{"message": "Bad request."})
        return
    }

    config.DB.Delete(&deletedPromo)
    c.JSON(200, gin.H{"message": "Successfully deleted promo."})
}


func CheckPromoCodeExists(c *gin.Context) {
	var request struct {
		PromoCode string
	}

	if err := c.Bind(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	if util.IsPromoCodeExists(request.PromoCode) {
		c.JSON(200, gin.H{"exists": true})
	} else {
		c.JSON(200, gin.H{"exists": false})
	}
}

func CheckUserPromo(c *gin.Context) {
    var request struct {
        UserID    int
        PromoCode string
	}

    if err := c.Bind(&request); err != nil {
        c.JSON(400, gin.H{"message": "Bad request."})
        return
    }

    var userPromo models.UserPromo
    result := config.DB.Where("user_id = ? AND promo_code = ?", request.UserID, request.PromoCode).First(&userPromo)
    if result.Error != nil {
        c.JSON(200, gin.H{"message": "Not exists."})
        return
    }

	c.JSON(400, gin.H{"message": "User has already used the promo code."})
}

func UsePromo(c *gin.Context){
	var request struct {
        UserID    int
        PromoCode string
	}

    if err := c.Bind(&request); err != nil {
        c.JSON(400, gin.H{"message": "Bad request."})
        return
    }

	userPromo := models.UserPromo{
        UserID:    request.UserID,
        PromoCode: request.PromoCode,
    }

    result := config.DB.Create(&userPromo)
    if result.Error != nil {
        c.JSON(500, gin.H{"message": "Error using promo."})
        return
    }

	c.JSON(200, gin.H{"message": "Success."})
}
