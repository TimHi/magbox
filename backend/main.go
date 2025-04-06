package main

import (
	"net/http"

	"github.com/charmbracelet/log"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/timhi/magbox/v2/api"
)

func main() {
	log.Info("Starting MagBox Backend...")
	app := pocketbase.New()
	// go run .\main.go serve --http="localhost:9000" --origins="*"
	// go run main.go serve --http="localhost:9000"
	// serves static files from the provided public dir (if exists)

	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		se.Router.GET("/ping", func(e *core.RequestEvent) error {
			return e.JSON(http.StatusOK, "Pong")
		})

		se.Router.GET("/api/url_preview/{url}", func(e *core.RequestEvent) error {
			return api.GetUrlPreview(e)
		})

		se.Router.GET("/api/collect_link/{token}/{url}", func(e *core.RequestEvent) error {
			return api.CollectLinkFromUser(e, app)
		})

		se.Router.POST("/api/import_bookmarks/{browser}", func(e *core.RequestEvent) error {
			return api.ImportBookmarks(e, app)
		})
		return se.Next()
	})

	if err := app.Start(); err != nil {

		log.Print(err)
	}
}
