// utils/auth.js
export function isAuthenticated() {
    // Check if the user ID exists in localStorage or any other authentication logic
    const userId = localStorage.getItem("userId");
    return !!userId; // Return true if the user ID exists, false otherwise
  }