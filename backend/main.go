package main

import (
	"net/http"

	"github.com/badoux/goscraper"
	"github.com/charmbracelet/log"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {

	app := pocketbase.New()
	// go run .\main.go serve --http="localhost:9000"
	// go run main.go serve --http="localhost:9000"
	// serves static files from the provided public dir (if exists)

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// register "GET /hello/{name}" route (allowed for everyone)
		se.Router.GET("/api/url_preview/:url", func(e *core.RequestEvent) error {
			url := e.Request.PathValue("url")
			s, err := goscraper.Scrape(url, 3)
			if err != nil {
				log.Print(err)
				return e.JSON(http.StatusInternalServerError, "Error Scraping")
			}
			return e.JSON(http.StatusOK, s.Preview)
		})
		apis.CORS(apis.CORSConfig{
			AllowOrigins: []string{"*"},
		})
		return se.Next()
	})

	if err := app.Start(); err != nil {
		log.Print(err)
	}
}
