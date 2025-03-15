package main

import (
	"net/http"
	"net/url"

	"github.com/badoux/goscraper"
	"github.com/charmbracelet/log"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	log.Info("Start")
	app := pocketbase.New()
	// go run .\main.go serve --http="localhost:9000" --origins="*"
	// go run main.go serve --http="localhost:9000"
	// serves static files from the provided public dir (if exists)

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/ping", func(e *core.RequestEvent) error {
			return e.JSON(http.StatusOK, "Pong")
		})

		se.Router.GET("/api/url_preview/{url}", func(e *core.RequestEvent) error {
			urlParamter := e.Request.PathValue("url")
			deocdedURL, err := url.QueryUnescape(urlParamter)
			if err != nil {
				log.Error(err)
				return e.JSON(http.StatusInternalServerError, "Error decoding URL")
			}

			log.Infof("Scrape URL: %s", deocdedURL)
			s, err := goscraper.Scrape(deocdedURL, 3)

			if err != nil {
				log.Print(err)
				return e.JSON(http.StatusInternalServerError, "Error Scraping")
			}
			return e.JSON(http.StatusOK, s.Preview)
		})

		se.Router.GET("/api/collect_link/{token}/{url}", func(e *core.RequestEvent) error {
			tokenParameter := e.Request.PathValue("token")
			urlParamter := e.Request.PathValue("url")
			deocdedURL, err := url.QueryUnescape(urlParamter)
			if err != nil {
				log.Error(err)
				return e.JSON(http.StatusInternalServerError, "Error decoding URL")
			}

			log.Infof("Recceived URL: %s Token: %s", deocdedURL, tokenParameter)
			log.Infof("Scrape URL: %s", deocdedURL)
			s, err := goscraper.Scrape(deocdedURL, 3)

			if err != nil {
				log.Print(err)
				return e.JSON(http.StatusInternalServerError, "Error Scraping")
			}
			log.Infof("Insert URL: %s", deocdedURL)

			// _, err := app.FindCollectionByNameOrId("links")
			// if err != nil {
			// 	return e.JSON(http.StatusInternalServerError, "Error inserting link")
			// }

			record, err := app.FindFirstRecordByData("users", "exttoken", tokenParameter)
			log.Info(record)
			return e.JSON(http.StatusOK, "")
		})
		return se.Next()
	})

	if err := app.Start(); err != nil {

		log.Print(err)
	}
}

// curl -X GET "http://localhost:9000/api/url_preview/https%3A%2F%2Fwww.strava.com%2Fdashboard/"
