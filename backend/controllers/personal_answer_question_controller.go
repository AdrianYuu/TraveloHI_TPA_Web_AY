package controllers

import (
	"strings"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"github.com/gin-gonic/gin"
)

func GetPersonalQuestions(c *gin.Context) {
	var personalQuestions []models.PersonalQuestion

	result := config.DB.Find(&personalQuestions)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error getting personal questions."})
		return
	}

	c.JSON(200, personalQuestions)
}

func GetPersonalQuestionsByEmail(c *gin.Context) {
	var request struct {
		Email string
	}

	if err := c.BindJSON(&request); err != nil {
		c.JSON(400, gin.H{"message": "Bad request"})
		return
	}

	var user models.User
	if err := config.DB.Where("email = ?", request.Email).Preload("PersonalAnswers").Preload("PersonalAnswers.PersonalQuestion").First(&user).Error; err != nil {
		c.JSON(500, gin.H{"message": "Error getting user."})
		return
	}

	var personalQuestions []models.PersonalQuestion
    for _, answer := range user.PersonalAnswers {
        personalQuestions = append(personalQuestions, answer.PersonalQuestion)
    }

    c.JSON(200, personalQuestions)
}

func CreatePersonalAnswer(c *gin.Context) {
	var personalAnswer models.PersonalAnswer

	if err := c.Bind(&personalAnswer); err != nil {
		c.JSON(400, gin.H{"message": "Bad request."})
		return
	}

	var question models.PersonalQuestion
    if err := config.DB.Where("id = ?", personalAnswer.PersonalQuestionID).First(&question).Error; err != nil {
        c.JSON(400, gin.H{"message": "Personal question ID does not exist."})
        return
    }

	result := config.DB.Create(&personalAnswer)
	if result.Error != nil {
		c.JSON(500, gin.H{"message": "Error creating personal answer."})
		return
	}

	c.JSON(200, gin.H{"message": "Success creating personal answer."})
}

func GetPersonalAnswerByIdAndUserId(UserID uint, PersonalQuestionID uint) models.PersonalAnswer {
    var personalAnswer models.PersonalAnswer
    config.DB.Where("user_id = ?", UserID).Where("personal_question_id = ?", PersonalQuestionID).First(&personalAnswer)
    return personalAnswer
}

func CheckPersonalAnswer(c *gin.Context){
	var request struct{
		PersonalAnswers []models.PersonalAnswer
	}

	if err := c.Bind(&request); err != nil {
        c.JSON(400, gin.H{"message": "Bad request."})
        return
    }

	for _, answer := range request.PersonalAnswers {
		if(strings.TrimSpace(answer.Answer) == ""){
			c.JSON(400, gin.H{"message": "Personal answer can't be empty."})
            return
		}

		var question models.PersonalQuestion
		if err := config.DB.Where("id = ?", answer.PersonalQuestionID).First(&question).Error; err != nil {
			c.JSON(400, gin.H{"message": "Personal question ID does not exist."})
			return
		}

		var personalAnswer = GetPersonalAnswerByIdAndUserId(answer.UserID, answer.PersonalQuestionID)
		if(answer.Answer != personalAnswer.Answer){
			c.JSON(400, gin.H{"message": "Wrong answer."})
			return
		}
    }

	c.JSON(200, gin.H{"message": "Success."})
}