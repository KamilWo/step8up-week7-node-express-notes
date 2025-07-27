// This file handles the business logic for notes, including persistent storage.
// It interacts directly with the data source (in this case, a JSON file).

const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs
const Note = require("../models/noteModel");

// Define the path to the JSON file where notes will be stored.
// It's placed in a 'data' directory at the root of the project.
const notesFilePath = path.join(__dirname, "../../../data/notes.json");

/**
 * Ensures the data directory and notes.json file exist.
 * If not, it creates them and initializes notes.json with an empty array.
 */
const initializeNotesFile = async () => {
  const dataDir = path.dirname(notesFilePath);
  try {
    await fs.mkdir(dataDir, { recursive: true }); // Create 'data' directory if it doesn't exist
    await fs.access(notesFilePath); // Check if notes.json exists
  } catch (error) {
    if (error.code === "ENOENT") {
      // File or directory does not exist, create notes.json with an empty array
      await fs.writeFile(notesFilePath, JSON.stringify([], null, 2), "utf8");
      console.log("notes.json created successfully.");
    } else {
      console.error("Error initializing notes file:", error);
      throw error;
    }
  }
};

/**
 * Reads all notes from the JSON file.
 * @returns {Promise<Note[]>} A promise that resolves to an array of Note objects.
 */
const getNotes = async () => {
  await initializeNotesFile(); // Ensure the file exists before reading
  try {
    const data = await fs.readFile(notesFilePath, "utf8");
    const notesData = JSON.parse(data);
    // Check if notes exist
    if (notesData.length === 0) {
      return []; // Return empty array if no notes found
    }
    // Map raw data to Note objects to ensure type consistency
    return notesData.map(Note.fromObject);
  } catch (error) {
    console.error("Error reading notes file:", error);
    return []; // Return empty array on error
  }
};

/**
 * Writes an array of notes to the JSON file.
 * @param {Note[]} notes - An array of Note objects to write.
 * @returns {Promise<void>} A promise that resolves when notes are written.
 */
const saveNotes = async (notes) => {
  try {
    // Ensure notes are plain objects before writing to JSON
    const plainNotes = notes.map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      createdAt: note.createdAt.toISOString(), // Store dates as ISO strings
      updatedAt: note.updatedAt.toISOString(),
    }));
    await fs.writeFile(
      notesFilePath,
      JSON.stringify(plainNotes, null, 2),
      "utf8"
    );
  } catch (error) {
    console.error("Error writing notes file:", error);
    throw error;
  }
};

/**
 * Creates a new note and saves it.
 * @param {object} noteData - The data for the new note (title, content).
 * @returns {Promise<Note>} A promise that resolves to the newly created Note object.
 */
const createNote = async (noteData) => {
  const notes = await getNotes();
  const newNote = new Note(uuidv4(), noteData.title, noteData.content);
  notes.push(newNote);
  await saveNotes(notes);
  return newNote;
};

/**
 * Retrieves a single note by its ID.
 * @param {string} id - The ID of the note to retrieve.
 * @returns {Promise<Note|null>} A promise that resolves to the Note object if found, otherwise null.
 */
const getNoteById = async (id) => {
  const notes = await getNotes();
  return notes.find((note) => note.id === id) || null;
};

/**
 * Updates an existing note.
 * @param {string} id - The ID of the note to update.
 * @param {object} updatedData - The new data for the note (title, content).
 * @returns {Promise<Note|null>} A promise that resolves to the updated Note object if found, otherwise null.
 */
const updateNote = async (id, updatedData) => {
  const notes = await getNotes();
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex === -1) {
    return null; // Note not found
  }

  const existingNote = notes[noteIndex];
  const updatedNote = new Note(
    existingNote.id,
    updatedData.title || existingNote.title,
    updatedData.content || existingNote.content,
    existingNote.createdAt,
    new Date() // Update the updatedAt timestamp
  );

  notes[noteIndex] = updatedNote;
  await saveNotes(notes);
  return updatedNote;
};

/**
 * Deletes a note by its ID.
 * @param {string} id - The ID of the note to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the note was deleted, false otherwise.
 */
const deleteNote = async (id) => {
  let notes = await getNotes();
  const initialLength = notes.length;
  notes = notes.filter((note) => note.id !== id);

  if (notes.length < initialLength) {
    await saveNotes(notes);
    return true; // Note was found and deleted
  }
  return false; // Note not found
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
