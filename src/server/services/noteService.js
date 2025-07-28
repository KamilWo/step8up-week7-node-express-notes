// This file handles the business logic for notes, including persistent storage.
// It interacts directly with the data source (in this case, a PostgreSQL database).

const { pool } = require("../config/db");
const Note = require("../models/noteModel");

const db_name = process.env.PGDATABASE;
/**
 * Reads all notes from the database.
 * @returns {Promise<Note[]>} A promise that resolves to an array of Note objects.
 */
const getNotes = async () => {
  try {
    const result = await pool.query(
      `SELECT * FROM ${db_name} ORDER BY "updatedAt" DESC`
    );
    return result.rows.map(Note.fromObject);
  } catch (error) {
    console.error("Error fetching notes from database:", error);
    throw error;
  }
};

/**
 * Creates a new note and saves it to the database.
 * @param {object} noteData - The data for the new note (title, content).
 * @returns {Promise<Note>} A promise that resolves to the newly created Note object.
 */
const createNote = async (noteData) => {
  try {
    const { title, content } = noteData;
    const query = `
      INSERT INTO ${db_name} (title, content)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const result = await pool.query(query, [title, content]);
    return Note.fromObject(result.rows[0]);
  } catch (error) {
    console.error("Error creating note in database:", error);
    throw error;
  }
};

/**
 * Retrieves a single note by its ID from the database.
 * @param {string} id - The ID of the note to retrieve.
 * @returns {Promise<Note|null>} A promise that resolves to the Note object if found, otherwise null.
 */
const getNoteById = async (id) => {
  try {
    const result = await pool.query(`SELECT * FROM ${db_name} WHERE id = $1`, [
      id,
    ]);
    if (result.rows.length === 0) {
      return null;
    }
    return Note.fromObject(result.rows[0]);
  } catch (error) {
    console.error(`Error fetching note with id ${id}:`, error);
    throw error;
  }
};

/**
 * Updates an existing note in the database.
 * @param {string} id - The ID of the note to update.
 * @param {object} updatedData - The new data for the note (title, content).
 * @returns {Promise<Note|null>} A promise that resolves to the updated Note object if found, otherwise null.
 */
const updateNote = async (id, updatedData) => {
  try {
    // Dynamically build the query to only update provided fields.
    const fields = [];
    const values = [];
    let paramIndex = 1;

    if (updatedData.title) {
      fields.push(`title = $${paramIndex++}`);
      values.push(updatedData.title);
    }
    if (updatedData.content) {
      fields.push(`content = $${paramIndex++}`);
      values.push(updatedData.content);
    }

    // Always update the 'updatedAt' timestamp
    fields.push(`"updatedAt" = NOW()`);

    values.push(id); // Add the ID for the WHERE clause

    const query = `
      UPDATE ${db_name}
      SET ${fields.join(", ")}
      WHERE id = $${paramIndex}
      RETURNING *;
    `;

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return null; // Note not found
    }
    return Note.fromObject(result.rows[0]);
  } catch (error) {
    console.error(`Error updating note with id ${id}:`, error);
    throw error;
  }
};

/**
 * Deletes a note by its ID from the database.
 * @param {string} id - The ID of the note to delete.
 * @returns {Promise<boolean>} A promise that resolves to true if the note was deleted, false otherwise.
 */
const deleteNote = async (id) => {
  try {
    const result = await pool.query(`DELETE FROM ${db_name} WHERE id = $1`, [
      id,
    ]);
    // result.rowCount will be 1 if a row was deleted, 0 otherwise.
    return result.rowCount > 0;
  } catch (error) {
    console.error(`Error deleting note with id ${id}:`, error);
    throw error;
  }
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
