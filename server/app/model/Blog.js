const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tag: {
    type: Array,
  },
  createdAt: {
    type: Date,
    default: Date.now, // You can set a default value if needed
  },
});
postSchema.index({ title: "text" });

const Blogdb = mongoose.model("blogs", postSchema);
module.exports = Blogdb;
