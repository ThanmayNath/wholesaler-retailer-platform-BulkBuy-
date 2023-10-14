package handlers

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"example.com/BulkBuy/models"
)

type ProductHandler struct {
	db *sql.DB
}

func NewProductHandler(db *sql.DB) *ProductHandler {
	return &ProductHandler{
		db: db,
	}
}


/*func (ph *ProductHandler) GetProducts(c *gin.Context) {
	rows, err := ph.db.Query("SELECT * FROM public.products")
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	var products []models.Product

	for rows.Next() {
		var product models.Product
		var imageURL2 sql.NullString
		var imageURL3 sql.NullString
		err := rows.Scan(&product.ID,&product.CATID,&product.WHOLID, &product.Name,&product.DESC,&product.PRICE,&product.QUANTITY,&product.IMAGE1,&imageURL2,&imageURL3)
		if err != nil {
			log.Fatal(err)
		}
		if imageURL2.Valid {
			product.IMAGE2 = imageURL2.String
			product.IMAGE3 = imageURL3.String
		} else {
			product.IMAGE2 = ""
			product.IMAGE3 = ""
		}
		products = append(products, product)
	}
	c.JSON(200, products)
}*/

func (ph *ProductHandler) GetProducts(c *gin.Context) {
	responseChan := make(chan models.Product)
	go ph.fetchProducts(responseChan)
	var products []models.Product
	for product := range responseChan {
		products = append(products, product)
	}
	c.JSON(http.StatusOK, products)
}

func (ph *ProductHandler) GetWholesalerProducts(c *gin.Context) {
	value := c.Param("id")
	fmt.Print(value)
	if value == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing or invalid 'id' parameter"})
		return
	}
	responseChan := make(chan models.Product)
	go ph.fetchWholesalerProducts(responseChan, value) // Pass value as an argument
	var products []models.Product
	for product := range responseChan {
		products = append(products, product)
	}
	c.JSON(http.StatusOK, products)
}

func (ph *ProductHandler) UpdateProducts(c *gin.Context){
    var updateData models.UpdateProductData
    if err := c.ShouldBindJSON(&updateData); err != nil {
		fmt.Print(err)
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
	fmt.Print(updateData)

    // Perform the update operation in your database
    query := "UPDATE products SET product_price=$1, product_quantity=$2 WHERE product_id=$3"
    _, err := ph.db.Exec(query, updateData.ProductPrice, updateData.ProductQuantity, updateData.ProductID)
    if err != nil {
		fmt.Print(err)
        c.JSON(http.StatusInternalServerError, gin.H{"error": "An error occurred while updating the product."})
        return
    }

    // Respond with a success message
    c.JSON(http.StatusOK, gin.H{"message": "Updated successfully."})
}

func (ph *ProductHandler) fetchWholesalerProducts(responseChan chan<- models.Product, wholesalerID string) {
	query := "SELECT * FROM public.products WHERE wholesaler_id=$1" // Use a prepared statement
	rows, err := ph.db.Query(query, wholesalerID) // Pass wholesalerID as a parameter
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var product models.Product
		var imageURL2 sql.NullString
		var imageURL3 sql.NullString
		err := rows.Scan(&product.ID, &product.CATID, &product.WHOLID, &product.Name, &product.DESC, &product.PRICE, &product.QUANTITY, &product.IMAGE1, &imageURL2, &imageURL3)
		if err != nil {
			log.Fatal(err)
		}
		if imageURL2.Valid {
			product.IMAGE2 = imageURL2.String
			product.IMAGE3 = imageURL3.String
		} else {
			product.IMAGE2 = ""
			product.IMAGE3 = ""
		}
		responseChan <- product
	}
	close(responseChan)
}

func (ph *ProductHandler) fetchProducts(responseChan chan<- models.Product) {
	rows, err := ph.db.Query("SELECT * FROM public.products")
	fmt.Print(rows)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		var product models.Product
		var imageURL2 sql.NullString
		var imageURL3 sql.NullString
		err := rows.Scan(&product.ID, &product.CATID, &product.WHOLID, &product.Name, &product.DESC, &product.PRICE, &product.QUANTITY, &product.IMAGE1, &imageURL2, &imageURL3)
		if err != nil {
			log.Fatal(err)
		}
		if imageURL2.Valid {
			product.IMAGE2 = imageURL2.String
			product.IMAGE3 = imageURL3.String
		} else {
			product.IMAGE2 = ""
			product.IMAGE3 = ""
		}
		responseChan <- product
	}
	close(responseChan)
}