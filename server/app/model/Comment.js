const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // You can set a default value if needed
  },
});

const Commentdb = mongoose.model("comments", commentSchema);
module.exports = Commentdb;
