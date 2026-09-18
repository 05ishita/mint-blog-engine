const Post = require("../models/Post");

// GET all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

// GET single post
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Invalid post ID",
    });
  }
};

// CREATE post
const createPost = async (req, res) => {
  try {
    const { title, category, author, date, content, markdown } = req.body;

    if (!title || !category || !author || !date || !content || !markdown) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const post = await Post.create({
      title,
      category,
      author,
      date,
      content,
      markdown,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create post",
      error: error.message,
    });
  }
};

// UPDATE post
const updatePost = async (req, res) => {
  try {
    const { title, category, author, date, content, markdown } = req.body;

    if (!title || !category || !author || !date || !content || !markdown) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        category,
        author,
        date,
        content,
        markdown,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update post",
      error: error.message,
    });
  }
};

// DELETE post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete post",
    });
  }
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};