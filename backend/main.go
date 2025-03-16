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

			record, err := app.FindFirstRecordByData("users", "exttoken", tokenParameter)
			if record == nil || err != nil {
				return e.JSON(http.StatusInternalServerError, "User not found for provided Token")
			}

			log.Infof("Scrape URL: %s", deocdedURL)
			s, err := goscraper.Scrape(deocdedURL, 3)
			if err != nil {
				log.Print(err)
				return e.JSON(http.StatusInternalServerError, "Error Scraping link")
			}

			linkCollection, err := app.FindCollectionByNameOrId("links")
			if err != nil {
				return e.JSON(http.StatusInternalServerError, "Error getting links collection")
			}

			newRecord := core.NewRecord(linkCollection)
			newRecord.Set("title", s.Preview.Name)
			newRecord.Set("image", s.Preview.Icon)
			newRecord.Set("link", deocdedURL)
			newRecord.Set("description", s.Preview.Description)
			newRecord.Set("userFK", record.Id)
			log.Info("Saving new record")
			err = app.Save(newRecord)
			log.Info(newRecord)
			log.Info("Saved new record")
			if err != nil {
				return e.JSON(http.StatusInternalServerError, "Error getting storing link")
			}
			return e.JSON(http.StatusOK, "")
		})
		return se.Next()
	})

	if err := app.Start(); err != nil {

		log.Print(err)
	}
}

// curl -X GET "http://localhost:9000/api/url_preview/https%3A%2F%2Fwww.strava.com%2Fdashboard/"
