// This file acts as a central point for managing all the application routes.
// It can include both API routes and any general web routes (if we had them).

const express = require("express");
const path = require("path");
const router = express.Router();
const { pool } = require("../config/db"); // Import database pool for health check
const notesApiRoutes = require("./api/notes"); // Import API routes

// --- Health Check Route ---
router.get("/healthz", async (req, res) => {
  try {
    // A simple query to check if the database is responsive.
    // 'SELECT 1' is a lightweight and standard way to ping a DB.
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    // 503 Service Unavailable is the standard code for a failed health check
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

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
