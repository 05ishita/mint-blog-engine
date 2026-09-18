const Post = require("../models/Post");

// GET all posts with search + pagination
const getPosts = async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      page = 1,
      limit = 6,
    } = req.query;

    const currentPage = Math.max(parseInt(page) || 1, 1);
    const postsPerPage = Math.max(parseInt(limit) || 6, 1);
    const skip = (currentPage - 1) * postsPerPage;

    const filter = {};

    // Search in title, content, markdown and author
    if (search.trim()) {
      const searchRegex = new RegExp(search.trim(), "i");

      filter.$or = [
        { title: searchRegex },
        { content: searchRegex },
        { markdown: searchRegex },
        { author: searchRegex },
      ];
    }

    // Category filter
    if (category.trim() && category !== "All") {
      filter.category = category;
    }

    const totalPosts = await Post.countDocuments(filter);

    const posts = await Post.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(postsPerPage);

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
      pagination: {
        currentPage,
        postsPerPage,
        totalPosts,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);

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
    const {
      title,
      category,
      author,
      date,
      content,
      markdown,
    } = req.body;

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
    console.error("Error creating post:", error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE post
const updatePost = async (req, res) => {
  try {
    const {
      title,
      category,
      author,
      date,
      content,
      markdown,
    } = req.body;

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
    console.error("Error updating post:", error);

    res.status(400).json({
      success: false,
      message: error.message,
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
      message: "Invalid post ID",
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