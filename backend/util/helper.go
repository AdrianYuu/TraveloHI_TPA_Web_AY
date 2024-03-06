package util

import (
	"fmt"
	"regexp"
	"strconv"
	"time"
	"unicode"

	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/models"
	"golang.org/x/crypto/bcrypt"
)

func IsAlphabetical(str string) bool {
    for _, char := range str {
        if !unicode.IsLetter(char) {
            return false
        }
    }
    return true
}

func IsEmailFormatValid(email string) bool {
	pattern := `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com)$`
    regex := regexp.MustCompile(pattern)
    return regex.MatchString(email)
}

func IsValidPassword(password string) bool {
    pattern := `^[A-Za-z0-9!@#$%^&*()-_=+{};:,<.>/?]+$`
    regex := regexp.MustCompile(pattern)
    return regex.MatchString(password)
}

func IsEmailExists(email string) bool {
	var user models.User

	result := config.DB.First(&user, "email = ?", email)
	if result.Error != nil {
		fmt.Println("No user found.")
		return false
	}

	return true
}

func GetAge(dateOfBirth string) int {
	layout := "2006-01-02"
    birthDate, err := time.Parse(layout, dateOfBirth)
    if err != nil {
        return 0
    }

    now := time.Now() 
    age := now.Year() - birthDate.Year()
    if now.YearDay() < birthDate.YearDay() {
        age--
    }
    
    return age
}

func HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func CompareHashAndPassword(hashedPassword []byte, password []byte) error {
    return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

func IsPromoCodeExists(promoCode string) bool {
	var promo models.Promo

	result := config.DB.First(&promo, "promo_code = ?", promoCode)
	if result.Error != nil {
		fmt.Println("No promo code found.")
		return false
	}

	return true
}

func IsAirlineNameExists(airlineName string) bool {
	var airline models.Airline

	result := config.DB.First(&airline, "airline_name = ?", airlineName)
	if result.Error != nil {
		fmt.Println("No airline name found.")
		return false
	}

	return true
}

func IsAirplaneNameExists(airplaneName string) bool {
	var airplane models.Airplane

	result := config.DB.First(&airplane, "airplane_name = ?", airplaneName)
	if result.Error != nil {
		fmt.Println("No airplane name found.")
		return false
	}

	return true
}

func IsFlightCodeExists(flightCode string) bool {
	var flight models.Flight

	result := config.DB.First(&flight, "flight_code = ?", flightCode)
	if result.Error != nil {
		fmt.Println("No flight code found.")
		return false
	}

	return true
}

func IsValidAmount(amount int) bool {
	if amount <= 0 {
		return false
	}
	_, err := strconv.Atoi(strconv.Itoa(amount))
	return err == nil
}

func IsNumericStr(s string) bool {
    for _, char := range s {
        if !unicode.IsDigit(char) {
            return false
        }
    }
    return true
}

func IsFinishAfterStart(startDateStr, finishDateStr string) bool {
	startDate, err := time.Parse("2006-01-02 15:04", startDateStr)
	if err != nil {
		fmt.Println("Error parsing start date:", err)
		return false
	}

	finishDate, err := time.Parse("2006-01-02 15:04", finishDateStr)
	if err != nil {
		fmt.Println("Error parsing finish date:", err)
		return false
	}

	return finishDate.After(startDate)
}

func IsFinishAfterStartWOTime(startDateStr, finishDateStr string) bool {
	startDate, err := time.Parse("2006-01-02", startDateStr)
	if err != nil {
		fmt.Println("Error parsing start date:", err)
		return false
	}

	finishDate, err := time.Parse("2006-01-02", finishDateStr)
	if err != nil {
		fmt.Println("Error parsing finish date:", err)
		return false
	}

	return finishDate.After(startDate)
}

func StringToInt(str string) int {
    num, _ := strconv.Atoi(str)
    return num
}

func Unique(slice []int) []int {
	encountered := map[int]bool{}
	result := []int{}

	for v := range slice {
		if !encountered[slice[v]] {
			encountered[slice[v]] = true
			result = append(result, slice[v])
		}
	}

	return result
}

func Contains(slice []int, val int) bool {
	for _, item := range slice {
		if item == val {
			return true
		}
	}
	return false
}