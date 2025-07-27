// Import required modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const config = require("./config");
const notesApiRoutes = require("./routes/api/notes");

// Create Express app
const app = express();

// Use environment variable for port, with a default
const PORT = config.port;

// Middleware to parse incoming JSON requests of content-type - application/json
app.use(express.json());

// Middleware to parse incoming URL-encoded requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../../public")));

// Routes
app.use("/api/notes", notesApiRoutes);

// A simple welcome route for the root path
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Node Express Notes API." });
});

// Wildcard route to handle undefined routes
app.all("*any", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ error: "Not found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

// Listen to requests
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});

// Export both the app and the server for testing purposes
module.exports = { app, server };
