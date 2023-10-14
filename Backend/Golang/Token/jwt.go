package Token

import (
	// ... other imports ...
	"fmt"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func VerifyJWT() gin.HandlerFunc {
    return func(c *gin.Context) {
        tokenString := c.GetHeader("x-access-token")
		fmt.Println("Received Token:", tokenString)
        if tokenString == "" {
			fmt.Println("Problem")
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Missing token"})
            c.Abort()
            return
        }

        tokenString = strings.Replace(tokenString, "Bearer ", "", 1) // Remove "Bearer " prefix if present
		fmt.Println("After Received Token:", tokenString)

        token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
            return []byte("jwtSecret"), nil // Replace "jwtSecret" with your actual secret key
        })

        if err != nil {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token"})
            c.Abort()
            return
        }

        if !token.Valid {
            c.JSON(http.StatusUnauthorized, gin.H{"error": "Token is not valid"})
            c.Abort()
            return
        }

        // If the token is valid, you can access claims like this:
        // claims := token.Claims.(jwt.MapClaims)
        // userID := claims["uid"].(string)

        c.Next()
    }
}
