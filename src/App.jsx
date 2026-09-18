import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import MarkdownEditor from "./components/MarkdownEditor";

import "./App.css";

const API_URL =
  "https://mint-blog-engine-backend.onrender.com/api/posts";

function calculateReadingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [bookmarks, setBookmarks] = useState(() => {
    return JSON.parse(localStorage.getItem("blogBookmarks")) || [];
  });

  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch posts from MongoDB
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await response.json();

      setPosts(result.data || []);
    } catch (err) {
      console.error(err);
      setError("Unable to load articles from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  const updatePost = async (id) => {
  const post = posts.find((item) => item._id === id);

  if (!post) return;

  const title = window.prompt("Enter new title:", post.title);
  if (!title) return;

  const content = window.prompt(
    "Enter new content:",
    post.content
  );
  if (!content) return;

  const markdown = window.prompt(
    "Enter new Markdown:",
    post.markdown
  );
  if (!markdown) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        category: post.category,
        author: post.author,
        date: post.date,
        content,
        markdown,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update post");
    }

    setPosts((currentPosts) =>
      currentPosts.map((item) =>
        item._id === id ? result.data : item
      )
    );

    setSelectedPost(result.data);

    alert("Post updated successfully!");
  } catch (err) {
    console.error(err);
    alert("Failed to update post.");
  }
};
  // Delete post
  const deletePost = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete post");
      }

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post._id !== id)
      );

      setSelectedPost(null);
      alert("Post deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  const postsWithReadingTime = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      readingTime: calculateReadingTime(
        `${post.title} ${post.content} ${post.markdown}`
      ),
    }));
  }, [posts]);

  const categories = [
    "All",
    ...new Set(postsWithReadingTime.map((post) => post.category)),
  ];

  const filteredPosts = postsWithReadingTime.filter((post) => {
    const matchesCategory =
      category === "All" || post.category === category;

    const searchText = search.toLowerCase();

    const matchesSearch =
      post.title.toLowerCase().includes(searchText) ||
      post.content.toLowerCase().includes(searchText) ||
      post.category.toLowerCase().includes(searchText);

    return matchesCategory && matchesSearch;
  });

  function toggleBookmark(id) {
    let updatedBookmarks;

    if (bookmarks.includes(id)) {
      updatedBookmarks = bookmarks.filter(
        (bookmark) => bookmark !== id
      );
    } else {
      updatedBookmarks = [...bookmarks, id];
    }

    setBookmarks(updatedBookmarks);

    localStorage.setItem(
      "blogBookmarks",
      JSON.stringify(updatedBookmarks)
    );
  }

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <div>
              <span className="eyebrow">
                DYNAMIC BLOG ENGINE
              </span>

              <h1>
                Ideas worth
                <span> reading.</span>
              </h1>

              <p>
                Explore development, JavaScript, design and technology
                articles through a modern headless-style blog experience.
              </p>

              <a href="#blogs" className="hero-btn">
                Explore Articles →
              </a>
            </div>

            <div className="hero-card">
              <div className="hero-card-top">
                <span>LIVE CONTENT</span>
                <span className="live-dot">●</span>
              </div>

              <div className="hero-number">
                {posts.length}
              </div>

              <p>Published Articles</p>
            </div>
          </div>
        </section>

        <section className="blog-section" id="blogs">
          <div className="container">
            <div className="section-heading">
              <span>EXPLORE</span>

              <h2>Latest Articles</h2>

              <p>
                Search articles, filter by category and save your favorites.
              </p>
            </div>

            <div className="controls">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="categories">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={category === item ? "active" : ""}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="empty-state">
                <h3>Loading articles...</h3>
                <p>Please wait while we fetch posts from MongoDB.</p>
              </div>
            ) : error ? (
              <div className="empty-state">
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post._id}
                    post={post}
                    bookmarked={bookmarks.includes(post._id)}
                    onBookmark={toggleBookmark}
                    onRead={setSelectedPost}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>No articles found</h3>
                <p>Try another keyword or category.</p>
              </div>
            )}
          </div>
        </section>

        <MarkdownEditor onPostCreated={fetchPosts} />
      </main>

      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="article-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedPost(null)}
            >
              ×
            </button>

            <span className="category">
              {selectedPost.category}
            </span>

            <h2>{selectedPost.title}</h2>

            <div className="modal-meta">
              {selectedPost.author} • {selectedPost.date} •{" "}
              {selectedPost.readingTime} min read
            </div>

            <div className="article-content">
              <ReactMarkdown>
                {selectedPost.markdown}
              </ReactMarkdown>
            </div>

            <div style={{ marginTop: "25px" }}>
  <button
    className="hero-btn"
    onClick={() => updatePost(selectedPost._id)}
    style={{
      marginRight: "10px",
      border: "none",
      cursor: "pointer",
    }}
  >
    Edit Article
  </button>

  <button
    className="hero-btn"
    onClick={() => deletePost(selectedPost._id)}
    style={{
      border: "none",
      cursor: "pointer",
    }}
  >
    Delete Article
  </button>
</div>
          </div>
        </div>
      )}

      <footer>
        <div className="container footer-content">
          <strong>
            Blog<span>Engine</span>
          </strong>

          <p>
            Built by Ishita Singh • Mint Technologies
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;