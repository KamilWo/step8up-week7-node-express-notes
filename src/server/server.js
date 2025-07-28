// Import required modules
require("dotenv").config(); // Load environment variables from .env file
const app = require("./app"); // Import the configured Express app
const config = require("./config"); // Import configuration settings
const { connectDB } = require("./config/db"); // Import database connection function

// Use environment variable for port, with a default
const PORT = config.port;

// Connect to the database
connectDB();

// Listen to requests
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log(`Access the application at http://localhost:${PORT}`);
});

// Export both the app and the server for testing purposes
module.exports = { app, server };
