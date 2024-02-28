const Comment = require("../model/Comment");

const CommentController = {
  async get(req, res) {
    try {
      const comment = await Comment.find({});
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async show(req, res) {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment không tồn tại." });
      }
      res.status(200).json(comment);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async create(req, res) {
    try {
      const newComment = new Comment(req.body);
      const saveComment = await newComment.save();
      res.status(201).json(saveComment);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async update(req, res) {
    try {
      const updateComment = await Comment.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).json(updateComment);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async delete(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).json({ message: "Comment không tồn tại." });
      }
      res.status(204).json();
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = CommentController;
