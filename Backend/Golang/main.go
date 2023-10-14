/*
package main

import (

	"example.com/BulkBuy/db"
	"example.com/BulkBuy/server"

)

	func main() {
	    db := db.SetupDB()
	    defer db.Close()

	    srv := server.NewServer(db)
	    srv.Run(":8800")
	}
*/
package main

import (
	"fmt"
	"log"
	"os"
	"strconv"

	"example.com/BulkBuy/db"
	"example.com/BulkBuy/server"
)

	func main() {
		db := db.SetupDB()
		defer db.Close()

		// Get the port number from command-line arguments
		if len(os.Args) < 2 {
			log.Fatal("Please provide a port number.")
		}

		port, err := strconv.Atoi(os.Args[1])
		if err != nil {
			log.Fatalf("Invalid port number: %s", err)
		}

		addr := fmt.Sprintf(":%d", port)

		srv := server.NewServer(db)
		srv.Run(addr)
	}

/*package main

import (
	"fmt"
	"log"
	"strconv"

	"example.com/BulkBuy/db"
	"example.com/BulkBuy/server"
)

func main() {
	db := db.SetupDB()
	defer db.Close()

	// Prompt the user to enter the port number
	var portStr string
	fmt.Print("Enter the port number: ")
	_, err := fmt.Scanln(&portStr)
	if err != nil {
		log.Fatalf("Failed to read port number: %s", err)
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		log.Fatalf("Invalid port number: %s", err)
	}

	addr := fmt.Sprintf(":%d", port)

	srv := server.NewServer(db)
	srv.Run(addr)
}

*/