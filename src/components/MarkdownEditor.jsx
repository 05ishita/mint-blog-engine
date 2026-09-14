import { useState } from "react";
import ReactMarkdown from "react-markdown";

function MarkdownEditor() {
  const [markdown, setMarkdown] = useState(
    "# My New Blog Post\n\nWrite your **markdown** content here..."
  );

  return (
    <section className="editor-section" id="editor">
      <div className="section-heading">
        <span>CREATE</span>
        <h2>Markdown Editor</h2>
        <p>Draft your article and preview it instantly.</p>
      </div>

      <div className="editor-grid">
        <div className="editor-panel">
          <h3>Write</h3>

          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your markdown here..."
          />
        </div>

        <div className="preview-panel">
          <h3>Live Preview</h3>

          <div className="markdown-preview">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MarkdownEditor;