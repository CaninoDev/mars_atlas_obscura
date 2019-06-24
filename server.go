package main

import (
	"encoding/json"
	"net/http"
)

func handleQuery(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)

	// read the query from URL params
	params := r.URL.Query()

	response, err := json.Marshal(params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(response)
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
