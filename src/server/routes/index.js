// This file acts as a central point for managing all the application routes.
// It can include both API routes and any general web routes (if we had them).

const express = require("express");
const path = require("path");
const router = express.Router();

// Import API routes
const notesApiRoutes = require("./api/notes");

// Mount API routes under a specific prefix
router.use("/api/notes", notesApiRoutes);

// A simple welcome route for the root API path
router.get("/api", (req, res) => {
  res.json({ message: "Welcome to the Notes API." });
});

// --- Static Page Routes ---

// Define the path to the public directory
const publicPath = path.join(__dirname, "../../../public");

router.get("/about", (req, res) => {
  res.sendFile(path.join(publicPath, "about.html"));
});

router.get("/contact", (req, res) => {
  res.sendFile(path.join(publicPath, "contact.html"));
});

router.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(publicPath, "privacy-policy.html"));
});

router.get("/terms-and-conditions", (req, res) => {
  res.sendFile(path.join(publicPath, "terms-and-conditions.html"));
});

module.exports = router;
