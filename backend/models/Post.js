const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },

    date: {
      type: String,
      required: [true, "Date is required"],
    },

    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },

    markdown: {
      type: String,
      required: [true, "Markdown content is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);