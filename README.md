# 📝 Full Stack Notes Application using Node.js and Express

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

---

## ✨ Overview

I built a **full-stack application** in **[Node.js](https://nodejs.org/)** and **[Express](https://expressjs.com/)**,
which is able to take notes and serialize/deserialize them from JSON files on the backend.

It allows users to **manage notes**, providing a complete **CRUD (Create, Read, Update, Delete)**
experience.

The backend of the application is built using **Node.js** and **Express**, and **HTML, CSS, and JavaScript**
in the frontend, demonstrating the ability to handle both API requests and serve static web pages.

Finally, the application is deployed on **Render.com**, showcasing practical deployment skills.

---

## 🚀 Features

* **Create New Notes**: Users can add new notes with a title and content.
* **Read Existing Notes**: All saved notes are displayed, allowing users to easily browse them.
* **Update Notes**: Users can modify the title or content of existing notes.
* **Delete Notes**: Unwanted notes can be removed from the list.
* **Persistent Storage**: Notes are stored persistently, ensuring data is not lost upon application restart.

---

## 👨‍💻 User Story

**AS A** User,
**I WANT** to create, edit, and delete notes,
**SO THAT** I can keep track of my thoughts and tasks efficiently.

---

## ✅ Acceptance Criteria

* **Express Server Setup**: An Express server is set up to serve both API endpoints and static frontend files.
* **Frontend UI**: A user-friendly frontend UI is implemented for adding, viewing, editing, and deleting notes.
* **CRUD Operations**: All Create, Read, Update, and Delete operations for notes are fully implemented and functional.
* **Persistent Storage**: Notes are stored persistently (e.g., using a JSON file or a database).
* **Render.com Deployment**: The application is successfully deployed on Render.com.
* **Submission**: Both the GitHub repository link and the deployed Render link are provided.

---

## ⚙️ Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/KamilWo/step8up-week7-node-express-notes.git
   cd step8up-week7-node-express-notes
   ```

2. **Initialize a new Node.js project**: (If starting from scratch, otherwise this is already done if you cloned)

   ```bash
   npm init -y
   ```

3. **Install Express**:

   ```bash
   npm install express
   ```

4. **Create the necessary files and folders**:

   ```
   /public (Frontend assets - HTML, CSS, JS)
   ├── index.html
   ├── styles.css
   ├── script.js
   /server.js (Main Express backend)
   /data.json (Storage for notes)
   ```

---

## 🚀 Usage

To run the application locally after installation:

1. **Start the Express server**:

   ```bash
   node server.js
   ```
   or
   ```bash
   node run start
   ```

2. **Open your web browser** and navigate to `http://localhost:3000` (or whatever port your server is configured to
   listen on) in the `.env` file.

You can then interact with the note-taking application through the web interface.

---

## 🧠 Key Learnings

* **Full-Stack Application Development**: Gained hands-on experience building a full-stack application using Node.js,
  Express, HTML, CSS, and JavaScript.
* **Deployment with Render.com**: Learned the process of deploying a Node.js application on Render.com.
* **README.md Structure**: Understood how to structure a comprehensive `README.md` file for project documentation.

---

## 🔗 Useful Online Resources

* [Deploying a Node.js Server Application on Render](https://medium.com/@harshpatil3775/deploying-a-node-js-server-application-on-render-com-5a123b33862d) -
  This article provided invaluable guidance on deploying the Node.js application to Render.com.

---

## 📜 License

This project is licensed under the **GPLv3 License**. See the [LICENSE](LICENSE) file for more details.
