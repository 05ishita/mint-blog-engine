function BlogCard({ post, bookmarked, onBookmark, onRead }) {
  return (
    <article className="blog-card">
      <div className="card-top">
        <span className="category">{post.category}</span>

        <button
          className={`bookmark ${bookmarked ? "saved" : ""}`}
          onClick={() => onBookmark(post.id)}
          title="Bookmark"
        >
          {bookmarked ? "★" : "☆"}
        </button>
      </div>

      <h3>{post.title}</h3>

      <p>{post.content}</p>

      <div className="card-meta">
        <span>{post.author}</span>
        <span>•</span>
        <span>{post.date}</span>
      </div>

      <div className="card-bottom">
        <span>{post.readingTime} min read</span>

        <button className="read-btn" onClick={() => onRead(post)}>
          Read Article →
        </button>
      </div>
    </article>
  );
}

export default BlogCard;