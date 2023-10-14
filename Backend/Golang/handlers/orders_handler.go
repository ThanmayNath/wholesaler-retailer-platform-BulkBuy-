package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"example.com/BulkBuy/models"
	"github.com/gin-gonic/gin"
)

type OrderHandler struct {
	db *sql.DB
}

func NewOrderHandler(db *sql.DB) *OrderHandler {
	return &OrderHandler{
		db: db,
	}
}

func (oh *OrderHandler) GetRetailerOrders(c *gin.Context) {
	value := c.Param("id")
	if value == ""{
		fmt.Print(value)
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing or invalid 'id' parameter"})
		return
	}
	responseChan := make(chan models.RetailerOrder)
	go oh.fetchRetailerOrders(responseChan,value)
	var result []models.RetailerOrder
	for order := range responseChan {
		result = append(result, order)
	}
	c.JSON(http.StatusOK,result)
}

func (oh *OrderHandler) GetWholesalerOrders(c *gin.Context) {
	value := c.Param("wholesaler_id")
	if value == ""{
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing or invalid 'id' parameter"})
		return
	}
	responseChan := make(chan models.OrderResult)
	go oh.fetchReceivedOrders(responseChan,value)
	var result []models.OrderResult
	for order := range responseChan {
		result = append(result, order)
	}
	c.JSON(http.StatusOK,result)
}

func (oh *OrderHandler) UpdateOrderDeliveryStatus(c *gin.Context) {
    value:= c.Param("order_items_id")
	fmt.Print(value)
	var UpdateVal bool = true
    query:="UPDATE public.order_items SET delivery_status=$1 WHERE order_items_id=$2"
    _, err :=oh.db.Exec(query,UpdateVal,value)
    if err != nil{
		fmt.Print(err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while updateing order status."})
        return
    }
    c.JSON(http.StatusAccepted,gin.H{"message":"Updated order successfully."})
}

func (oh *OrderHandler) fetchReceivedOrders(responseChan chan models.OrderResult,wholesalerID string){
	query:=`
	SELECT order_items.order_items_id, order_items.order_id, order_items.product_id, order_items.quantity, order_items.total_price, order_items.delivery_status,
		   orders.retailer_id,
		   retailers.retailer_name, retailers.retailer_address, retailers.retailer_city, retailers.retailer_number,
		   products.product_name
	FROM public.order_items
	JOIN public.orders ON order_items.order_id = orders.order_id
	JOIN public.retailers ON orders.retailer_id = retailers.retailer_id
	JOIN public.products ON order_items.product_id = products.product_id
	WHERE products.wholesaler_id = $1 AND orders.payment_status= $2
  `
  paymentStatus := "Completed"
    rows, err := oh.db.Query(query, wholesalerID, paymentStatus)
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

	for rows.Next() {
        var order models.OrderResult
        err := rows.Scan(&order.OrderItemsID, &order.OrderID, &order.ProductID, &order.Quantity,&order.TotalPrice,&order.DeliveryStatus,&order.RetailerID,&order.RetailerName,&order.RetailerAddress,&order.RetailerCity,&order.RetailerNumber,&order.ProductName)
        if err != nil {
            log.Fatal(err)
        }
        responseChan <- order
    }
    close(responseChan)

}

func (oh *OrderHandler) fetchRetailerOrders(responseChan chan models.RetailerOrder, retailerID string) {
    query := "SELECT order_id, order_date, order_status, total_amount FROM public.orders WHERE retailer_id=$1 AND payment_status=$2"
    paymentStatus := "Completed"
    rows, err := oh.db.Query(query, retailerID, paymentStatus)
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()

    for rows.Next() {
        var order models.RetailerOrder
        err := rows.Scan(&order.OrderID, &order.OrderDate, &order.OrderStatus, &order.TotalAmount)
        if err != nil {
            log.Fatal(err)
        }
        responseChan <- order
    }
    close(responseChan)
}
