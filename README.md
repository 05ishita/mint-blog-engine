# Mint Blog Engine

A modern full-stack blog engine built as part of the Mint Technologies Web Development Internship.

The project started as a React-based blog interface and was upgraded with a real Express.js backend and MongoDB database.

## Live Project

Frontend:
https://mint-blog-engine.vercel.app/

GitHub:
https://github.com/05ishita/mint-blog-engine

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- React Markdown
- CSS
- LocalStorage

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- REST API
- CORS
- dotenv

## Features

- Responsive blog interface
- Search articles
- Filter articles by category
- Bookmark articles
- Read articles in a modal
- Markdown article rendering
- Create new articles
- Edit existing articles
- Delete articles
- Real MongoDB database
- RESTful backend API
- Basic input validation
- Loading and error states

## Project Structure

```text
mint-blog-engine/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── postController.js
│   ├── models/
│   │   └── Post.js
│   ├── routes/
│   │   └── postRoutes.js
│   ├── .env
│   ├── seed.js
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── components/
│   ├── data/
│   ├── assets/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── package.json
├── vite.config.js
└── README.md