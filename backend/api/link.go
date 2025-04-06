package api

import (
	"net/http"
	"net/url"

	"github.com/badoux/goscraper"
	"github.com/charmbracelet/log"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func CollectLinkFromUser(e *core.RequestEvent, app *pocketbase.PocketBase) error {
	tokenParameter := e.Request.PathValue("token")
	urlParamter := e.Request.PathValue("url")
	deocdedURL, err := url.QueryUnescape(urlParamter)
	if err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "Error decoding URL")
	}

	record, err := app.FindFirstRecordByData("users", "exttoken", tokenParameter)
	if record == nil || err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "User not found for provided Token")
	}

	s, err := goscraper.Scrape(deocdedURL, 3)
	if err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "Error Scraping link")
	}

	linkCollection, err := app.FindCollectionByNameOrId("links")
	if err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "Error getting links collection")
	}

	newRecord := core.NewRecord(linkCollection)
	newRecord.Set("title", s.Preview.Name)
	newRecord.Set("image", s.Preview.Icon)
	newRecord.Set("link", deocdedURL)
	newRecord.Set("description", s.Preview.Description)
	newRecord.Set("userFK", record.Id)

	err = app.Save(newRecord)

	if err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "Error getting storing link")
	}
	return e.JSON(http.StatusOK, "Success!")
}
