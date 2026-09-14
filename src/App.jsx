import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import MarkdownEditor from "./components/MarkdownEditor";
import posts from "./data/posts";
import "./App.css";

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

  const postsWithReadingTime = useMemo(() => {
    return posts.map((post) => ({
      ...post,
      readingTime: calculateReadingTime(
        `${post.title} ${post.content} ${post.markdown}`
      ),
    }));
  }, []);

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
      updatedBookmarks = bookmarks.filter((bookmark) => bookmark !== id);
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
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main>
        <section className="hero" id="home">
          <div className="container hero-content">
            <div>
              <span className="eyebrow">DYNAMIC BLOG ENGINE</span>

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

              <div className="hero-number">{posts.length}</div>

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

            {filteredPosts.length > 0 ? (
              <div className="blog-grid">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    bookmarked={bookmarks.includes(post.id)}
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

        <MarkdownEditor />
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

            <span className="category">{selectedPost.category}</span>

            <h2>{selectedPost.title}</h2>

            <div className="modal-meta">
              {selectedPost.author} • {selectedPost.date} •{" "}
              {selectedPost.readingTime} min read
            </div>

            <div className="article-content">
              <ReactMarkdown>{selectedPost.markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="container footer-content">
          <strong>
            Blog<span>Engine</span>
          </strong>

          <p>Built by Ishita Singh • Mint Technologies</p>
        </div>
      </footer>
    </div>
  );
}

export default App;