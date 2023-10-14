package server

import (
	"database/sql"

	"example.com/BulkBuy/Token"
	"example.com/BulkBuy/handlers"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Server struct {
    router *gin.Engine
    db     *sql.DB
}

func NewServer(db *sql.DB) *Server {
    router := gin.Default()
    config := cors.DefaultConfig()
    config.AllowAllOrigins = true
    config.AddAllowHeaders("x-access-token")
    router.Use(cors.New(config))
    server := &Server{
        router: router,
        db:     db,
    }
    server.routes()
    return server
}

func (s *Server) Run(address string) {
    s.router.Run(address)
}

func (s *Server) routes() {
    productHandler := handlers.NewProductHandler(s.db)
    cartHandler := handlers.NewCartHandler(s.db)
    orderHandler := handlers.NewOrderHandler(s.db)
    // retailerHandler :=  handlers.NewRetailerHandler(s.db)
    s.router.GET("/products", Token.VerifyJWT(), productHandler.GetProducts)
    s.router.GET("/products/:id", Token.VerifyJWT(), productHandler.GetWholesalerProducts)
    s.router.PUT("/products/update", Token.VerifyJWT(), productHandler.UpdateProducts)

    s.router.GET("/cart/:id", Token.VerifyJWT(), cartHandler.GetCart)
    s.router.POST("/cart/add", Token.VerifyJWT(), cartHandler.AddToCart)
    s.router.PATCH("/cart", Token.VerifyJWT(), cartHandler.UpdateQuantity)
    s.router.DELETE("/cart/:id", Token.VerifyJWT(), cartHandler.DeleteIteam)

    s.router.GET("/orders/:id", Token.VerifyJWT(), orderHandler.GetRetailerOrders)
    s.router.GET("/orders/orderDetails/:wholesaler_id", Token.VerifyJWT(), orderHandler.GetWholesalerOrders)
    s.router.PATCH("/orders/delivery/:order_items_id", Token.VerifyJWT(), orderHandler.UpdateOrderDeliveryStatus)

    // s.router.POST("/login",retailerHandler.GetRetailer)
    // s.router.POST("/register",retailerHandler.CreateRetailer)
}