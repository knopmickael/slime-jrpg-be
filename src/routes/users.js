const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/list", usersController.listUsers);
router.get("/me", usersController.getCurrentUser);
router.get("/:username", usersController.getUserByUsername);

module.exports = router;
