package models

// type Retailer struct {
// 	ID       int    `json:"id"`
// 	NAME     string `json:"name"`
// 	EMAIL    string `json:"email"`
// 	PASSWORD string `json:"password"`
// 	ADDRESS  string `json:"address"`
// 	CITY     string `json:"city"`
// 	NUMBER   string `json:"number"`
// }

import "time"

type RetailerOrder struct {
	OrderID     string    `json:"order_id"`
	OrderDate   time.Time `json:"order_date"`
	OrderStatus string    `json:"order_status"`
	TotalAmount int       `json:"total_amount"`
}

type Retailer struct {
    RetailerID      int    `json:"retailer_id"`
    RetailerName    string `json:"retailer_name"`
    RetailerAddress string `json:"retailer_address"`
    RetailerCity    string `json:"retailer_city"`
    RetailerNumber  string `json:"retailer_number"`
}