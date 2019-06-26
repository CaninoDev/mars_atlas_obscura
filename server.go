package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"
	"time"
)

var httpClient = &http.Client{Timeout: 10 * time.Second}

func handlePhotosQuery(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	// read the query from URL params
	params := r.URL.Query()
	response, err := queryCameraPhotos(&params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func queryCameraPhotos(p *url.Values) ([]byte, error) {
	u := url.URL{
		Scheme: "http",
		Host:   "mars-photos.herokuapp.com",
		Path:   "/api/v1/rovers/Curiosity/photos",
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

func handleManifestsQuery(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	response, err := queryManifests()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
}

func queryManifests() ([]byte, error) {
	u := url.URL{
		Scheme: "http",
		Host:   "mars-photos.herokuapp.com",
		Path:   "/api/v1/manifests/Curiosity",
	}

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
	http.HandleFunc("/manifests", handleManifestsQuery)
	http.HandleFunc("/photos", handlePhotosQuery)
	if err := http.ListenAndServe(":5000", nil); err != nil {
		panic(err)
	}
}
