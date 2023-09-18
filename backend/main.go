package main

import (
	"net/http"

	"github.com/badoux/goscraper"
	"github.com/charmbracelet/log"
	"github.com/labstack/echo/v5"
	"github.com/labstack/echo/v5/middleware"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {

	app := pocketbase.New()
	// go run .\main.go serve --http="localhost:9000"
	// go run main.go serve --http="localhost:9000"
	// serves static files from the provided public dir (if exists)
	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.AddRoute(echo.Route{
			Method: http.MethodGet,
			Path:   "/api/url_preview/:url",
			Handler: func(c echo.Context) error {
				url := c.PathParam("url")
				s, err := goscraper.Scrape(url, 3)
				if err != nil {
					log.Error(err)
					return c.JSON(http.StatusInternalServerError, "Error Scraping")
				}
				log.Print(s.Preview)
				return c.JSON(http.StatusOK, s.Preview)
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
