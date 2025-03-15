function setSettings() {
  const backendUrl = localStorage.getItem("backendurl");
  const token = localStorage.getItem("token");
  if (backendUrl !== null) {
    document.getElementById("backend").value = backendUrl;
  }
  if (token !== null) {
    document.getElementById("ftoken").value = token;
  }
}

/**
 * Listen for clicks on the buttons, and send the appropriate message to
 * the content script in the page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    function setToken() {
      const token = document.getElementById("ftoken");
      localStorage.setItem("token", token.value);
    }

    function setLink() {
      const link = document.getElementById("backend");
      localStorage.setItem("backendurl", link.value);
    }

    function sendLink() {
      const backendUrl = localStorage.getItem("backendurl");
      const token = localStorage.getItem("token");
      const pageUrl = encodeURIComponent(encodeURIComponent(document.URL));
      const url = new URL(`${backendUrl}/api/collect_link/${token}/${pageUrl}`);
      if (backendUrl !== null && token !== null) {
        try {
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              if (data.status !== 200) {
                throw new Error(`Response status: ${data.status}`);
              }
            });
        } catch (error) {
          console.error(error.message);
        }
      }
    }

    if (e.target.id === "send-link") {
    }
    if (e.target.id === "set-backend") {
      setLink();
    }
    if (e.target.id === "set-token") {
      setToken();
    }
  });
}

/**
 * There was an error executing the script.
 * Display the popup's error message, and hide the normal UI.
 */
function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute Magbox content script: ${error.message}`);
}

//Popup opens, inject script:
browser.tabs
  .executeScript({ file: "/content_scripts/magbox.js" })
  .then(setSettings)
  .then(listenForClicks)
  .catch(reportExecuteScriptError);
