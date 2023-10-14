package db

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func SetupDB() *sql.DB {
    db, err := sql.Open("postgres", "postgres://postgres:123abc@localhost:5432/BulkBuy?sslmode=disable")
    if err != nil {
        log.Fatal(err)
    }
    return db
}
