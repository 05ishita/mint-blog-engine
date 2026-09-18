# BlogEngine — Full-Stack Blog Platform

A modern full-stack blog platform built as part of the **Mint Technologies Web Development Internship Milestone Track**.

BlogEngine started as a responsive static blog interface and was progressively converted into a React application with a real Express/MongoDB backend, CRUD functionality, search, category filtering, pagination, and deployment.

---

## 🌐 Live Project

### Frontend
https://mint-blog-engine.vercel.app/

### Backend API
https://mint-blog-engine-backend.onrender.com

### GitHub Repository
https://github.com/05ishita/mint-blog-engine

---

## 📌 Project Overview

**BlogEngine** is a full-stack content management application where users can browse, search, filter, create, update, and delete blog articles.

The project was developed incrementally across multiple milestones:

- Responsive frontend
- React conversion
- Real backend API
- MongoDB database integration
- CRUD operations
- Search and pagination
- Category filtering
- Deployment
- Final UI and documentation polish

The final application connects a React frontend to a deployed Express API backed by MongoDB.

---

## 🎯 Why I Built This Project

The main goal of this project was to understand how a real web application evolves from a static frontend into a complete full-stack application.

Instead of keeping blog content hardcoded in the frontend, the final version uses:

- React for the user interface
- Express.js for the backend API
- MongoDB for persistent data storage
- Mongoose for database interaction
- Vercel for frontend deployment
- Render for backend deployment

This also provided practical experience with REST APIs, CRUD operations, validation, deployment, and connecting a frontend application to a production backend.

---

# ✨ Features

## Frontend Features

- Responsive modern UI
- React-based component architecture
- Navigation between major sections
- Hero section
- Blog article cards
- Article reading modal
- Markdown article rendering
- Search articles
- Filter articles by category
- Pagination
- Create new articles
- Edit existing articles
- Delete articles
- Bookmark articles using browser localStorage
- Dark/light mode
- Loading state
- Error state
- Empty search-result state
- Mobile responsive layout

---

## Backend Features

- Express.js REST API
- MongoDB database
- Mongoose models
- Complete CRUD operations
- Search functionality
- Category filtering
- Pagination
- Basic request validation
- MongoDB ObjectId validation
- Proper HTTP status codes
- CORS configuration
- Environment variable support

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- React Markdown

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Development & Deployment

- Git
- GitHub
- Vercel
- Render
- MongoDB Atlas

---

# 🏗️ Project Structure

```text
mint-blog-engine/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── postController.js
│   │
│   ├── models/
│   │   └── Post.js
│   │
│   ├── routes/
│   │   └── postRoutes.js
│   │
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
├── src/
│   ├── components/
│   │   ├── BlogCard.jsx
│   │   ├── Header.jsx
│   │   └── MarkdownEditor.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── public/
│
├── package.json
├── package-lock.json
└── README.md