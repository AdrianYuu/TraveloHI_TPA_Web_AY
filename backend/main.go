package main

import (
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/config"
	_ "github.com/AdrianYuu/TraveloHI_TPA_Web_AY/docs"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/initializers"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/middleware"
	"github.com/AdrianYuu/TraveloHI_TPA_Web_AY/route"
	"github.com/gin-gonic/gin"
)

func init(){
	initializers.LoadEnvVariables()
}

func main() {
	config.Connect()
	// database.Migrate()
	// database.Seed()

	r := gin.Default()
	middleware.InitCORS(r)
	route.InitRoutes(r)

	r.Run(":8080")
}