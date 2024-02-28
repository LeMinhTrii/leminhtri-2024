const Post = require("../model/Blog");
const User = require("../model/User");
const Comment = require("../model/Comment");
const BlogController = {
  async get(req, res) {
    try {
      const page = req.query.page || 1;
      const limit = req.query.limit || 5;
      const skip = (page - 1) * limit;
      const totalpost = await Post.find({});
      const posts = await Post.aggregate([
        { $skip: skip },
        { $limit: parseInt(limit) },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "postId",
            as: "comments",
          },
        },
        { $unwind: { path: "$comments", preserveNullAndEmptyArrays: true } },
        {
          $lookup: {
            from: "users",
            localField: "comments.userId",
            foreignField: "_id",
            as: "commentUser",
          },
        },
        {
          $addFields: {
            "comments.userName": { $arrayElemAt: ["$commentUser.name", 0] },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user",
          },
        },
        {
          $addFields: {
            userName: { $arrayElemAt: ["$user.name", 0] },
          },
        },
        {
          $group: {
            _id: "$_id",
            title: { $first: "$title" },
            content: { $first: "$content" },
            userId: { $first: "$userId" },
            tag: { $first: "$tag" },
            createdAt: { $first: "$createdAt" },
            userName: { $first: "$userName" },
            comments: { $push: "$comments" },
          },
        },
        { $sort: { createdAt: 1 } },
      ]);

      res.status(200).json({
        message: "success",
        data: posts,
        totalpage: Math.ceil(totalpost.length / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  },

  async show(req, res) {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ message: "Bài viết không tồn tại." });
      }
      const user = await User.findById({ _id: post.userId });
      const comments = await Comment.find({ postId });

      // Get an array of unique user IDs from comments
      const uniqueUserIds = [
        ...new Set(comments.map((comment) => comment.userId)),
      ];

      // Lookup users based on unique user IDs
      const users = await User.find({ _id: { $in: uniqueUserIds } });

      // Create a user mapping for quick lookup
      const userMapping = {};
      users.forEach((user) => {
        userMapping[user._id] = user.name;
      });

      // Add the username to each comment
      const commentsWithUsername = comments.map((comment) => ({
        ...comment.toObject(),
        userName: userMapping[comment.userId],
      }));

      res.status(200).json({
        post,
        comments: commentsWithUsername,
        user,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json(error);
    }
  },

  async create(req, res) {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async update(req, res) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async delete(req, res) {
    try {
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        return res.status(404).json({ message: "Bài viết không tồn tại." });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json(error);
    }
  },
  async search(req, res) {
    const { search } = req.query;
    try {
      let posts;
      if (req.query === "") {
        posts = await Post.find({});
      } else {
        posts = await Post.find({
          title: { $regex: new RegExp(search, "i") },
        });
      }
      res.status(200).json(posts);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  },
};

module.exports = BlogController;
