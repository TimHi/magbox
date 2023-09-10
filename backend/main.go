package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/badoux/goscraper"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {

	app := pocketbase.New()
	// go run .\main.go serve --http="localhost:8090"
	// go run main.go serve --http="localhost:8090"
	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/url_preview/:url",
			Handler: func(c echo.Context) error {
				url := c.PathParam("url")
				s, err := goscraper.Scrape(url, 5)
				if err != nil {
					fmt.Println(err)
					return c.JSON(http.StatusInternalServerError, "Error Scraping")
				}
				fmt.Printf("Icon : %s\n", s.Preview.Icon)
				fmt.Printf("Name : %s\n", s.Preview.Name)
				fmt.Printf("Title : %s\n", s.Preview.Title)
				fmt.Printf("Description : %s\n", s.Preview.Description)
				if len(s.Preview.Images) > 0 {
					fmt.Printf("Image: %s\n", s.Preview.Images[0])
				}
				fmt.Printf("Url : %s\n", s.Preview.Link)
				return c.JSON(http.StatusOK, "")

			},
			Middlewares: []echo.MiddlewareFunc{
				apis.ActivityLogger(app),
				middleware.CORSWithConfig(middleware.CORSConfig{
					AllowOrigins: []string{"*"},
				}),
			},
		})
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
