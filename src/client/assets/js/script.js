document.addEventListener("DOMContentLoaded", () => {
  // --- Element Selectors ---
  const noteForm = document.getElementById("note-form");
  const noteIdInput = document.getElementById("note-id");
  const noteTitleInput = document.getElementById("note-title");
  const noteContentInput = document.getElementById("note-content");
  const notesList = document.getElementById("notes-list");
  const clearBtn = document.getElementById("clear-btn");
  const themeToggleBtn = document.getElementById("theme-toggle-btn");

  const API_URL = "/api/notes";

  // --- Theme Toggler Logic ---
  const applyTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("notes-theme", theme);
  };

  const toggleTheme = () => {
    const currentTheme =
      document.documentElement.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    applyTheme(newTheme);
  };

  themeToggleBtn.addEventListener("click", toggleTheme);

  // Apply saved theme or system preference on initial load
  const savedTheme = localStorage.getItem("notes-theme");
  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (systemPrefersDark) {
    applyTheme("dark");
  } else {
    applyTheme("light");
  }

  // --- API Functions ---

  const fetchNotes = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch notes");
      const notes = await response.json();
      renderNotes(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      notesList.innerHTML =
        "<li>Error loading notes. Please try again later.</li>";
    }
    noteTitleInput.focus();
  };

  const saveNote = async (note) => {
    const method = note.id ? "PUT" : "POST";
    const url = note.id ? `${API_URL}/${note.id}` : API_URL;

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: note.title, content: note.content }),
      });
      if (!response.ok) throw new Error(`Failed to save note`);
      clearForm();
      fetchNotes(); // Refresh the list after saving
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      // A 204 response has no content, so we just check if the status is ok.
      if (!response.ok) {
        throw new Error("Failed to delete note on the server.");
      }
      // This is the key: after a successful deletion, re-fetch all notes.
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  // --- UI Functions ---

  const renderNotes = (notes) => {
    notesList.innerHTML = ""; // Clear existing notes
    if (notes.length === 0) {
      notesList.innerHTML = "<li>No notes yet. Create one!</li>";
      return;
    }
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.dataset.id = note.id;
      li.innerHTML = `
        <div class="note-content">
          <h3>${note.title}</h3>
          <p>${note.content}</p>
        </div>
        <div class="note-actions">
          <button class="btn btn-edit">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </div>
      `;
      notesList.appendChild(li);
    });
  };

  const clearForm = () => {
    noteIdInput.value = "";
    noteTitleInput.value = "";
    noteContentInput.value = "";
  };

  const fillFormForEdit = (note) => {
    noteIdInput.value = note.id;
    noteTitleInput.value = note.title;
    noteContentInput.value = note.content;
    noteTitleInput.focus();
  };

  // --- Event Listeners ---

  noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = {
      id: noteIdInput.value,
      title: noteTitleInput.value,
      content: noteContentInput.value,
    };
    saveNote(note);
  });

  notesList.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    const id = li.dataset.id;
    if (e.target.classList.contains("btn-danger")) {
      if (confirm("Are you sure you want to delete this note?")) {
        deleteNote(id);
      }
    } else if (e.target.classList.contains("btn-edit")) {
      const title = li.querySelector("h3").textContent;
      const content = li.querySelector("p").textContent;
      fillFormForEdit({ id, title, content });
    }
  });

  clearBtn.addEventListener("click", clearForm);

  // Initial fetch when the page loads
  fetchNotes();
});
