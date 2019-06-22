package main

import (
	"encoding/json"
	"net/http"
)

type Message struct {
	Text string
}

func handleQuery(w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	message := Message{"This is the backend server"}

	res, err := json.Marshal(message)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.Write(res)
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
