package api

import (
	"net/http"
	"strings"

	"golang.org/x/net/html"

	"github.com/charmbracelet/log"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func ImportBookmarks(e *core.RequestEvent, app *pocketbase.PocketBase) error {
	importFrom := e.Request.PathValue("browser")
	log.Infof("Importing from %s", importFrom)
	ReceiveFile(e.Request)
	return e.JSON(http.StatusAccepted, "Aal")
}

func ReceiveFile(r *http.Request) {
	r.ParseMultipartForm(32 << 20) // limit your max input length!
	//var buf bytes.Buffer
	// in your case file would be fileupload
	file, header, err := r.FormFile("file")
	if err != nil {
		panic(err)
	}
	defer file.Close()
	name := strings.Split(header.Filename, ".")
	log.Infof("File name %s\n", name[0])
	parsed, err := html.Parse(file)
	if err != nil {
		log.Error(err)
		return
	}

	for n := range parsed.Descendants() {
		if n.Type == html.ElementNode && n.Data == "a" {
			for _, a := range n.Attr {
				if a.Key == "href" {
					if a.Val != "" {
						log.Info(a.Val)
					}
				}
			}
		}
	}
	// Copy the file data to my buffer
	//io.Copy(&buf, file)
	// do something with the contents...
	// I normally have a struct defined and unmarshal into a struct, but this will
	// work as an example
	//contents := buf.String()
	//log.Info(contents)
	// I reset the buffer in case I want to use it again
	// reduces memory allocations in more intense projects
	//buf.Reset()
	// do something else
	// etc write header
	//return
}
