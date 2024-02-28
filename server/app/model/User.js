const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // You can set a default value if needed
  },
});

const Userdb = mongoose.model("users", userSchema);
module.exports = Userdb;
