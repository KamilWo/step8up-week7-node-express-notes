// Import required modules
const express = require("express"); // For building web application
const path = require("path"); // For serving static files
const cors = require("cors"); // For frontend/backend communication in development
const allRoutes = require("./routes"); // Import the main router
const errorHandler = require("./middleware/errorHandler"); // Global error handling middleware

// Create Express app
const app = express();

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse incoming JSON requests of content-type - application/json
app.use(express.json());

// Middleware to parse incoming URL-encoded requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (for CSS, JS, images)
app.use(express.static(path.join(__dirname, "../../public")));

// Mount all routes from the main router
app.use("/", allRoutes);

// Wildcard route to handle undefined routes (404 Not Found)
// This must be placed after all other routes. Express 5.x.x has named parameter (any)
app.all("*any", (req, res) => {
  res.status(404);
  // If the request is for an API route, send JSON, otherwise let the client handle it.
  if (req.originalUrl.startsWith("/api/")) {
    return res.status(404).json({ error: "API route not found" });
  }
  // For non-API routes, send the main HTML file to let the client-side router work.
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

app.use(errorHandler); // Global error handling middleware (should be last)

module.exports = app;
