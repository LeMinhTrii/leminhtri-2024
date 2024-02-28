// routes.js
const express = require("express");
const router = express.Router();
const BlogController = require("../controller/BlogController");

router.get("/blogs", BlogController.get);
router.get("/blogs/:id", BlogController.show);
router.post("/blogs", BlogController.create);
router.put("/blogs/:id", BlogController.update);
router.delete("/blogs/:id", BlogController.delete);
router.get("/searchblog", BlogController.search);

module.exports = router;
