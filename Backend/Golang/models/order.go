package models

// import "example.com/BulkBuy/models"

// import "time"

// type RetailerOrder struct {
// 	OrderID     string    `json:"order_id"`
// 	OrderDate   time.Time `json:"order_date"`
// 	OrderStatus string    `json:"order_status"`
// 	TotalAmount int       `json:"total_amount"`
// }

type OrderItem struct {
    OrderItemsID    int    `json:"order_items_id"`
    OrderID         string    `json:"order_id"`
    ProductID       int    `json:"product_id"`
    Quantity        int    `json:"quantity"`
    TotalPrice      int `json:"total_price"`
    DeliveryStatus  bool `json:"delivery_status"`
}

// type Productss struct {
//     ProductName string `db:"product_name"`
// }

type OrderResult struct {
    OrderItem
    Retailer
    ProductName string `json:"product_name"`
}