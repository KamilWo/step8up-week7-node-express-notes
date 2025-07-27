// This file contains the logic for handling HTTP requests related to notes.
// It interacts with the noteService to perform CRUD operations.

const noteService = require("../services/noteService");

/**
 * Get all notes.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getAllNotes = async (req, res) => {
  try {
    const notes = await noteService.getNotes();
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Failed to retrieve notes." });
  }
};

/**
 * Get a single note by ID.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const getNote = async (req, res) => {
  try {
    const note = await noteService.getNoteById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    res.status(500).json({ message: "Failed to retrieve note." });
  }
};

/**
 * Create a new note.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Title and content are required to create a note." });
  }

  try {
    const newNote = await noteService.createNote({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ message: "Failed to create note." });
  }
};

/**
 * Update an existing note.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  if (!title && !content) {
    return res
      .status(400)
      .json({ message: "At least title or content is required for update." });
  }

  try {
    const updatedNote = await noteService.updateNote(id, { title, content });
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).json({ message: "Failed to update note." });
  }
};

/**
 * Delete a note.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
const deleteNote = async (req, res) => {
  try {
    const deleted = await noteService.deleteNote(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Note not found." });
    }
    res.status(204).send(); // 204 No Content for successful deletion
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ message: "Failed to delete note." });
  }
};

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};
