import { useState } from "react";

const API_URL = "http://localhost:5000/api/posts";

function MarkdownEditor({ onPostCreated }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    author: "Ishita Singh",
    date: new Date().toISOString().split("T")[0],
    content: "",
    markdown: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.author ||
      !formData.date ||
      !formData.content ||
      !formData.markdown
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          date: new Date(formData.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          }),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create post");
      }

      alert("Post created successfully!");

      setFormData({
        title: "",
        category: "Development",
        author: "Ishita Singh",
        date: new Date().toISOString().split("T")[0],
        content: "",
        markdown: "",
      });

      if (onPostCreated) {
        await onPostCreated();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create post.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="blog-section">
      <div className="container">
        <div className="section-heading">
          <span>CREATE</span>

          <h2>Publish a New Article</h2>

          <p>
            Create and save a new article directly to MongoDB.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            display: "grid",
            gap: "16px",
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Article title"
            value={formData.title}
            onChange={handleChange}
            style={inputStyle}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="Development">Development</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Design">Design</option>
            <option value="Backend">Backend</option>
            <option value="Tools">Tools</option>
            <option value="Technology">Technology</option>
          </select>

          <input
            type="text"
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            style={inputStyle}
          />

          <textarea
            name="content"
            placeholder="Short article description"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            style={inputStyle}
          />

          <textarea
            name="markdown"
            placeholder="Write your Markdown article here..."
            value={formData.markdown}
            onChange={handleChange}
            rows="10"
            style={inputStyle}
          />

          <button
            type="submit"
            disabled={loading}
            className="hero-btn"
            style={{
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Publishing..." : "Publish Article"}
          </button>
        </form>
      </div>
    </section>
  );
}

const inputStyle = {
  width: "100%",
  padding: "14px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(128, 128, 128, 0.35)",
  background: "transparent",
  color: "inherit",
  fontSize: "15px",
  outline: "none",
  boxSizing: "border-box",
};

export default MarkdownEditor;