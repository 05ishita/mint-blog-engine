function Header({ darkMode, setDarkMode }) {
  return (
    <header className="header">
      <div className="container nav">
        <a href="#" className="logo">
          Blog<span>Engine</span>
        </a>

        <nav>
          <a href="#home">Home</a>
          <a href="#blogs">Blogs</a>
          <a href="#editor">Write</a>
        </nav>

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}

export default Header;