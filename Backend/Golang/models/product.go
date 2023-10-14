package models

type Product struct {
	ID       int    `json:"product_id"`
	CATID    int    `json:"category_id"`
	WHOLID   int    `json:"wholesaler_id"`
	Name     string `json:"product_name"`
	DESC     string `json:"product_description"`
	PRICE    int    `json:"product_price"`
	QUANTITY int    `json:"product_quantity"`
	IMAGE1   string `json:"product_image_url"`
	IMAGE2   string `json:"product_image_url2"`
	IMAGE3   string `json:"product_image_url3"`
}

type UpdateProductData struct {
	ProductID       int    `json:"product_id"`
	ProductQuantity string `json:"product_quantity"`
	ProductPrice    string `json:"product_price"`
}

type CartProduct struct {
	CartID             int    `json:"cart_id"`
	ProductID          int    `json:"product_id"`
	Quantity           int    `json:"quantity"`
	ProductName        string `json:"product_name"`
	ProductPrice       int    `json:"product_price"`
	ProductDescription string `json:"product_description"`
	ProductImageURL    string `json:"product_image_url"`
}

type Cart struct {
	RetailerID string `json:"retailer_id"`
	Quantity   int    `json:"quantity"`
	ProductID  int    `json:"product_id"`
}

type UpdateQuantity struct {
	CartID   int `json:"id"`
	Quantity int `json:"quantity"`
}