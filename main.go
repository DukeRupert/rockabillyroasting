package main

import (
	"log"
	"net/http"
	"os"

	"github.com/dukerupert/go-woocommerce-api"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

type ProductCategory string

const (
	CategoryCoffee	ProductCategory = "20"
)

type ProductStatus string

const (
	StatusAny	ProductStatus = "any"
	StatusDraft	ProductStatus = "draft"
	StatusPending ProductStatus = "pending"
	StatusPrivate ProductStatus	= "private"
	StatusPublished	ProductStatus = "publish"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	wooBaseURL := os.Getenv("WOO_BASE_URL")
	wooConsumerKey := os.Getenv("WOO_CONSUMER_KEY")
	wooConsumerSecret := os.Getenv("WOO_CONSUMER_SECRET")

	client, err := woocommerce.New(wooBaseURL)

	if err != nil {
		// handle error
		log.Fatal("Error creating woocommerce client")
		return
	}

	client.Authenticate(wooConsumerKey, wooConsumerSecret)

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World!")
	})
	e.GET("/products", func(c echo.Context) error {
		opts := &woocommerce.ListProductParams{
			Category: string(CategoryCoffee),
			Status: string(StatusPublished),
		}

		products, _, err := client.Products.List(opts)
		if err != nil {
			log.Printf("error fetching products list: %s", err.Error())
			c.Error(err)
		}
		return c.JSON(http.StatusOK, products)
	})
	e.Logger.Fatal(e.Start(":1323"))
}
