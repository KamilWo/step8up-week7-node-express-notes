// This file acts as a central point for managing all the application routes.
// It can include both API routes and any general web routes (if we had them).

const express = require("express");
const router = express.Router();

// Import API routes
const notesApiRoutes = require("./api/notes");

// Mount API routes under a specific prefix
router.use("/api/notes", notesApiRoutes);

// router.get("/about", (req, res) => {
//   res.send("About Us Page");
// });

module.exports = router;
