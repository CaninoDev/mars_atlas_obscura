package main

import (
	"net/http"
	"net/url"
	"fmt"
	"time"
	"io/ioutil"
)

var httpClient = &http.Client{Timeout: 10 * time.Second}

func handleQuery(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	// read the query from URL params
	params := r.URL.Query()
	response, err := queryNASA(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func queryNASA(p *url.Values) ([]byte, error) {
	u := url.URL{
		Scheme: "http",
		Host: "mars-photos.herokuapp.com",
		Path: "/api/v1/rovers/Curiosity/photos",
	}

	q := u.Query()
	q.Set("camera", p.Get("camera"))
	q.Set("sol", p.Get("sol"))
	u.RawQuery = q.Encode()

	fmt.Println(u.String())

	response, err := httpClient.Get(u.String())
	if err != nil {
		panic(err.Error())
	}
	defer response.Body.Close()

	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		panic(err.Error())
	}

	return []byte(body), nil

}

func enableCors(w *http.ResponseWriter) {
    (*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func main() {
	http.HandleFunc("/api/v1/", handleQuery)
	if err := http.ListenAndServe(":3001", nil); err != nil {
		panic(err)
	}
}
