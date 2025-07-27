// Import required modules
require("dotenv").config();
const express = require("express");
const path = require("path");

// Create Express app
const app = express();

// Use environment variable for port, with a default
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests of content-type - application/json
app.use(express.json());

// Middleware to parse incoming URL-encoded requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(require("cors")());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../../public")));

// Define a simple route for the API root
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node Express Notes API." });
});

// Listen to requests
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});
