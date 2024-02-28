// routes.js
const express = require("express");
const router = express.Router();
const UserController = require("../controller/UserController");

router.get("/users", UserController.get);
router.get("/users/:id", UserController.show);
router.post("/users", UserController.create);
router.put("/users/:id", UserController.update);
router.delete("/users/:id", UserController.delete);

module.exports = router;
