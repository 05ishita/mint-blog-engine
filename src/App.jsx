import { useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import MarkdownEditor from "./components/MarkdownEditor";

import "./App.css";

const API_URL =
  "https://mint-blog-engine-backend.onrender.com/api/posts";

function calculateReadingTime(text = "") {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);

  const postsPerPage = 3;

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedPost, setSelectedPost] = useState(null);

  const [bookmarks, setBookmarks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("blogBookmarks")) || [];
    } catch {
      return [];
    }
  });

  const categories = [
    "All",
    "JavaScript",
    "Backend",
    "Design",
    "Tools",
    "Development",
    "Technology",
  ];

  const fetchPosts = async (
    page = 1,
    searchValue = "",
    categoryValue = "All"
  ) => {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      params.append("page", page);
      params.append("limit", postsPerPage);

      if (searchValue.trim()) {
        params.append("search", searchValue.trim());
      }

      if (categoryValue !== "All") {
        params.append("category", categoryValue);
      }

      const response = await fetch(`${API_URL}?${params.toString()}`);

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const result = await response.json();

      setPosts(result.data || []);

      if (result.pagination) {
        setCurrentPage(result.pagination.currentPage);
        setTotalPages(result.pagination.totalPages);
        setTotalPosts(result.pagination.totalPosts);
      } else {
        setCurrentPage(1);
        setTotalPages(1);
        setTotalPosts(result.data?.length || 0);
      }
    } catch (err) {
      console.error(err);
      setError("Unable to load articles. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, "", "All");
  }, []);

  const postsWithReadingTime = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      readingTime: calculateReadingTime(
        `${post.title || ""} ${post.content || ""} ${
          post.markdown || ""
        }`
      ),
    }));
  }, [posts]);

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
    fetchPosts(1, value, category);
  };

  const handleCategory = (value) => {
    setCategory(value);
    setCurrentPage(1);
    fetchPosts(1, search, value);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);
    fetchPosts(page, search, category);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleBookmark = (id) => {
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
  };

  const updatePost = async (id) => {
    const post = posts.find((item) => item._id === id);

    if (!post) return;

    const title = window.prompt(
      "Enter new title:",
      post.title
    );

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
        throw new Error(
          result.message || "Failed to update post"
        );
      }

      const updatedPost = {
        ...result.data,
        readingTime: calculateReadingTime(
          `${result.data.title} ${result.data.content} ${result.data.markdown}`
        ),
      };

      setPosts((currentPosts) =>
        currentPosts.map((item) =>
          item._id === id ? updatedPost : item
        )
      );

      setSelectedPost(updatedPost);

      alert("Post updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update post.");
    }
  };

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
        throw new Error(
          result.message || "Failed to delete post"
        );
      }

      setSelectedPost(null);

      await fetchPosts(currentPage, search, category);

      alert("Post deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main>
        {/* HERO */}
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
                Explore development, JavaScript, design and
                technology articles through a modern
                headless-style blog experience.
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
                {totalPosts}
              </div>

              <p>Published Articles</p>
            </div>
          </div>
        </section>

        {/* ARTICLES */}
        <section className="blog-section" id="blogs">
          <div className="container">
            <div className="section-heading">
              <span>EXPLORE</span>

              <h2>Latest Articles</h2>

              <p>
                Search articles, filter by category and save
                your favorites.
              </p>
            </div>

            {/* SEARCH + FILTER */}
            <div className="controls">
              <div className="search-box">
                <span>⌕</span>

                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) =>
                    handleSearch(e.target.value)
                  }
                />
              </div>

              <div className="categories">
                {categories.map((item) => (
                  <button
                    key={item}
                    className={
                      category === item ? "active" : ""
                    }
                    onClick={() => handleCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* LOADING */}
            {loading && (
              <div className="empty-state">
                <h3>Loading articles...</h3>
                <p>
                  Please wait while we fetch posts from
                  MongoDB.
                </p>
              </div>
            )}

            {/* ERROR */}
            {!loading && error && (
              <div className="empty-state">
                <h3>Something went wrong</h3>
                <p>{error}</p>

                <button
                  className="hero-btn"
                  onClick={() =>
                    fetchPosts(
                      currentPage,
                      search,
                      category
                    )
                  }
                >
                  Try Again
                </button>
              </div>
            )}

            {/* POSTS */}
            {!loading &&
              !error &&
              postsWithReadingTime.length > 0 && (
                <div className="blog-grid">
                  {postsWithReadingTime.map((post) => (
                    <BlogCard
                      key={post._id}
                      post={post}
                      bookmarked={bookmarks.includes(
                        post._id
                      )}
                      onBookmark={toggleBookmark}
                      onRead={setSelectedPost}
                    />
                  ))}
                </div>
              )}

            {/* NO RESULTS */}
            {!loading &&
              !error &&
              postsWithReadingTime.length === 0 && (
                <div className="empty-state">
                  <h3>No articles found</h3>
                  <p>
                    Try another keyword or category.
                  </p>
                </div>
              )}

            {/* PAGINATION */}
            {!loading && !error && totalPages > 1 && (
              <div className="pagination">
                <p>
                  Showing page {currentPage} of{" "}
                  {totalPages} • {totalPosts} articles
                </p>

                <div>
                  <button
                    onClick={() =>
                      handlePageChange(
                        currentPage - 1
                      )
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() =>
                        handlePageChange(page)
                      }
                      className={
                        currentPage === page
                          ? "active"
                          : ""
                      }
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      handlePageChange(
                        currentPage + 1
                      )
                    }
                    disabled={
                      currentPage === totalPages
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CREATE ARTICLE */}
        <MarkdownEditor
          onPostCreated={() =>
            fetchPosts(1, search, category)
          }
        />
      </main>

      {/* ARTICLE MODAL */}
      {selectedPost && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="article-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <button
              className="close-btn"
              onClick={() =>
                setSelectedPost(null)
              }
            >
              ×
            </button>

            <span className="category">
              {selectedPost.category}
            </span>

            <h2>{selectedPost.title}</h2>

            <div className="modal-meta">
              {selectedPost.author} •{" "}
              {selectedPost.date} •{" "}
              {selectedPost.readingTime ||
                calculateReadingTime(
                  `${selectedPost.title} ${
                    selectedPost.content || ""
                  } ${selectedPost.markdown || ""}`
                )}{" "}
              min read
            </div>

            <div className="article-content">
              <ReactMarkdown>
                {selectedPost.markdown ||
                  selectedPost.content}
              </ReactMarkdown>
            </div>

            <div
              style={{
                marginTop: "25px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <button
                className="hero-btn"
                onClick={() =>
                  updatePost(selectedPost._id)
                }
                style={{
                  marginTop: 0,
                  cursor: "pointer",
                }}
              >
                Edit Article
              </button>

              <button
                className="hero-btn"
                onClick={() =>
                  deletePost(selectedPost._id)
                }
                style={{
                  marginTop: 0,
                  cursor: "pointer",
                }}
              >
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
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