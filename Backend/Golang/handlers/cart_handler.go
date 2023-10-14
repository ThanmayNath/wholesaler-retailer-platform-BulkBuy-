package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"example.com/BulkBuy/models"
	"github.com/gin-gonic/gin"
)

type CartHandler struct {
	db *sql.DB
}

func NewCartHandler(db *sql.DB) *CartHandler {
	return &CartHandler{
		db: db,
	}
}

func (ch *CartHandler) GetCart(c *gin.Context) {
    value := c.Param("id")
    responseChan := make(chan models.CartProduct)
    go ch.fetchCartProducts(responseChan, value) // Pass value as an argument
    var products []models.CartProduct // Change the type to CartProduct
    for product := range responseChan {
        products = append(products, product)
    }
    fmt.Print(products)
    c.JSON(http.StatusOK, products)
}

func (ch *CartHandler) AddToCart(c *gin.Context) {
    var value models.Cart
    if err := c.ShouldBindJSON(&value); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    query := "INSERT INTO public.cart(retailer_id, product_id, quantity)VALUES ($1, $2, $3)"
     _, err := ch.db.Exec(query,value.RetailerID,value.ProductID,value.Quantity)
    if err != nil{
        c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while adding iteam to cart."})
        return
    }
    c.JSON(http.StatusOK, gin.H{"message": "Iteam added Successfully."})
}

func (ch *CartHandler) UpdateQuantity(c *gin.Context) {
    var value models.UpdateQuantity
    if err := c.ShouldBindJSON(&value); err!=nil {
        c.JSON(http.StatusBadRequest,gin.H{"error":err.Error()})
        return
    }
    query:="UPDATE public.cart SET quantity = $1 WHERE cart_id = $2"
    _, err :=ch.db.Exec(query,value.Quantity,value.CartID)
    if err != nil{
        c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while updateing quantity."})
        return
    }
    c.JSON(http.StatusAccepted,gin.H{"message":"Updated quantity successfully."})
}

func (ch *CartHandler) DeleteIteam(c *gin.Context) {
    value := c.Param("id")
    query:="DELETE FROM public.cart WHERE cart_id = $1"
    _, err :=ch.db.Exec(query,value)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while deleting iteam."})
        return
    }
    c.JSON(http.StatusOK,gin.H{"message":"Deleted from cart successfully"})
}

func (ch *CartHandler) fetchCartProducts(responseChan chan<- models.CartProduct, retailerID string) {
    query := `SELECT cart.cart_id, cart.product_id, cart.quantity, products.product_name, products.product_price,products.product_description,products.product_image_url
    FROM public.cart 
    INNER JOIN public.products ON cart.product_id = products.product_id
    WHERE cart.retailer_id = $1`
    rows, err := ch.db.Query(query, retailerID) // Pass retailerID as a parameter
    if err != nil {
        log.Fatal(err)
    }
    defer rows.Close()
    for rows.Next() {
        var product models.CartProduct // Change the type to CartProduct
        err := rows.Scan(&product.CartID, &product.ProductID, &product.Quantity, 
            &product.ProductName, &product.ProductPrice, 
            &product.ProductDescription, &product.ProductImageURL) // Update field names
        if err != nil {
            log.Fatal(err)
        }
        responseChan <- product
    }
    close(responseChan)
}
