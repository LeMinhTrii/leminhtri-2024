require("dotenv").config();

const express = require("express");
const app = express();
const bodyparse = require("body-parser");
const cors = require("cors");

// connect Database
const connectDB = require("./app/database/connection");
connectDB();

// routes
const blogRoutes = require("./app/routes/blog.routes");
const commentRoutes = require("./app/routes/comment.routes");
const userRoutes = require("./app/routes/user.routes");

// cors
// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors());

//parse request to body-parse
app.use(bodyparse.urlencoded({ extended: true }));
app.use(bodyparse.json());

app.use("/api", blogRoutes);
app.use("/api", commentRoutes);
app.use("/api", userRoutes);

// port
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log("Server running");
});
