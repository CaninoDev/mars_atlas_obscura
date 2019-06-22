package main

import (
	"net/http"
)

func handleQuery(w http.ResponseWriter, r *http.Request) {
	message := "This is the backend server"

	w.Write([]byte(message))
}

func main() {
	http.HandleFunc("/api/v1/", handleQuery)
	if err := http.ListenAndServe(":3001", nil); err != nil {
		panic(err)
	}
}
