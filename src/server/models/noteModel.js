// This file defines the structure of a Note object.

class Note {
  /**
   * Represents a Note.
   * @param {string} id - Unique identifier for the note.
   * @param {string} title - The title of the note.
   * @param {string} content - The content/body of the note.
   * @param {Date} createdAt - Timestamp when the note was created.
   * @param {Date} updatedAt - Timestamp when the note was last updated.
   */
  constructor(
    id,
    title,
    content,
    createdAt = new Date(),
    updatedAt = new Date()
  ) {
    if (!id || !title || !content) {
      throw new Error("Note requires an id, title, and content.");
    }
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /**
   * Creates a Note instance from a plain object (e.g., from JSON file).
   * @param {object} data - Plain object containing note properties.
   * @returns {Note} A new Note instance.
   */
  static fromObject(data) {
    return new Note(
      data.id,
      data.title,
      data.content,
      new Date(data.createdAt),
      new Date(data.updatedAt)
    );
  }
}

module.exports = Note;
