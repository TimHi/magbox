package api

import (
	"net/http"
	"net/url"

	"github.com/badoux/goscraper"
	"github.com/charmbracelet/log"
	"github.com/pocketbase/pocketbase/core"
)

func GetUrlPreview(e *core.RequestEvent) error {
	urlParamter := e.Request.PathValue("url")
	deocdedURL, err := url.QueryUnescape(urlParamter)
	if err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "Error decoding URL")
	}

	log.Infof("Scrape URL: %s", deocdedURL)
	s, err := goscraper.Scrape(deocdedURL, 3)

	if err != nil {
		log.Error(err)
		return e.JSON(http.StatusInternalServerError, "Error Scraping")
	}
	return e.JSON(http.StatusOK, s.Preview)
}
