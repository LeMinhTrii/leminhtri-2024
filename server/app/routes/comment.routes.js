// routes.js
const express = require("express");
const router = express.Router();
const CommentController = require("../controller/CommentController");

router.get("/comments", CommentController.get);
router.get("/comments/:id", CommentController.show);
router.post("/comments", CommentController.create);
router.put("/comments/:id", CommentController.update);
router.delete("/comments/:id", CommentController.delete);

module.exports = router;
