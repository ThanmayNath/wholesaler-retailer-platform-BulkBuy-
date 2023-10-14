package handlers

// import (
// 	"database/sql"
// 	"fmt"
// 	"net/http"

// 	"example.com/BulkBuy/models"
// 	"github.com/gin-gonic/gin"
// )

// type RetailerHandler struct {
// 	db *sql.DB
// }

// func NewRetailerHandler(db *sql.DB) *RetailerHandler{
// 	return &RetailerHandler{
// 		db:db,
// 	}
// }

// func (rh *RetailerHandler) GetRetailer(c *gin.Context){
// 	email:=c.PostForm("email")
// 	fmt.Println(email)
// 	password:=c.PostForm("password")
// 	var retailer models.Retailer
// 	err:=rh.db.QueryRow("SELECT retailer_id,retailer_name,retailer_password FROM public.retailers WHERE retailer_email = $1",email).Scan(&retailer.ID,&retailer.NAME,&retailer.PASSWORD)
// 	if err!= nil{
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email"})
// 		return
// 	}
// 	if password!=retailer.PASSWORD{
// 		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid password"})
// 		return
// 	}
// 	c.JSON(http.StatusOK,retailer)
// }

// func (rh *RetailerHandler) CreateRetailer(c *gin.Context){
// 	retailer:=models.Retailer{
// 		NAME: c.PostForm("name"),
// 		EMAIL: c.PostForm("email"),
// 		PASSWORD: c.PostForm("password"),
// 		NUMBER: c.PostForm("number"),
// 	}
// 	_, err := rh.db.Exec("INSERT INTO public.retailers (retailer_name, retailer_email, retailer_password, retailer_number) VALUES ($1, $2, $3, $4)",
// 		retailer.NAME, retailer.EMAIL, retailer.PASSWORD, retailer.NUMBER)
// 	if err != nil {
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create retailer"})
// 		return
// 	}

// 	c.JSON(http.StatusCreated, retailer)
// }
