require("dns").setServers(["8.8.8.8", "8.8.4.4"]);
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Post = require("./models/Post");

dotenv.config();

const posts = [
  {
    title: "Building Modern React Applications",
    category: "Development",
    author: "Ishita Singh",
    date: "September 10, 2026",
    content:
      "React makes it easier to build interactive and reusable user interfaces. Component-based architecture helps developers organize large applications into smaller manageable pieces.",
    markdown:
      "## Building Modern React Applications\n\nReact helps developers build **interactive** and reusable interfaces.\n\n### Key Benefits\n\n- Reusable components\n- Fast development\n- Component-based architecture\n- Large ecosystem",
  },
  {
    title: "Getting Started with JavaScript",
    category: "JavaScript",
    author: "Ishita Singh",
    date: "September 8, 2026",
    content:
      "JavaScript is one of the most important technologies for modern web development. Understanding variables, functions, arrays, objects and asynchronous programming creates a strong foundation.",
    markdown:
      "## Getting Started with JavaScript\n\nJavaScript is essential for modern **web development**.\n\n### Start With\n\n- Variables\n- Functions\n- Arrays\n- Objects\n- Async programming",
  },
  {
    title: "Responsive Web Design Principles",
    category: "Design",
    author: "Ishita Singh",
    date: "September 5, 2026",
    content:
      "Responsive design ensures that websites work smoothly across desktops, tablets and mobile devices. Flexible layouts and media queries are key techniques.",
    markdown:
      "## Responsive Web Design\n\nResponsive design makes websites work across **all screen sizes**.\n\n### Important Techniques\n\n- Flexible layouts\n- CSS Grid\n- Flexbox\n- Media queries",
  },
  {
    title: "Understanding REST APIs",
    category: "Backend",
    author: "Ishita Singh",
    date: "September 2, 2026",
    content:
      "REST APIs allow frontend applications to communicate with backend services using HTTP methods such as GET, POST, PUT and DELETE.",
    markdown:
      "## Understanding REST APIs\n\nREST APIs connect the frontend with backend services.\n\n### HTTP Methods\n\n- **GET** - Read data\n- **POST** - Create data\n- **PUT** - Update data\n- **DELETE** - Remove data",
  },
  {
    title: "Introduction to Node.js and Express",
    category: "Backend",
    author: "Ishita Singh",
    date: "August 28, 2026",
    content:
      "Node.js allows JavaScript to run on the server while Express provides a lightweight framework for creating APIs and web applications.",
    markdown:
      "## Node.js and Express\n\nNode.js allows JavaScript to run on the **server**.\n\nExpress makes creating APIs simple and structured.",
  },
  {
    title: "Git and GitHub for Developers",
    category: "Tools",
    author: "Ishita Singh",
    date: "August 25, 2026",
    content:
      "Git is a version control system that helps developers track code changes. GitHub makes it easier to collaborate and store repositories online.",
    markdown:
      "## Git and GitHub\n\nGit helps developers **track code changes**.\n\nGitHub provides online repositories for collaboration and sharing.",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    await Post.deleteMany();

    await Post.insertMany(posts);

    console.log("6 posts inserted successfully");

    await mongoose.connection.close();

    console.log("Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedDatabase();