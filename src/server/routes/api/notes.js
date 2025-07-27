// This file defines the API routes specifically for notes.

const express = require("express");
const router = express.Router();
const notesController = require("../../controllers/notesController");

// GET /api/notes - Get all notes
router.get("/", notesController.getAllNotes);

// GET /api/notes/:id - Get a single note by ID
router.get("/:id", notesController.getNote);

// POST /api/notes - Create a new note
router.post("/", notesController.createNote);

// PUT /api/notes/:id - Update an existing note
router.put("/:id", notesController.updateNote);

// DELETE /api/notes/:id - Delete a note
router.delete("/:id", notesController.deleteNote);

module.exports = router;
