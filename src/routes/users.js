const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/me", usersController.getCurrentUser);
router.get("/list", usersController.listUsers);
router.post("/set-lph", usersController.setLastPickedHero);
router.get("/:username", usersController.getUserByUsername);

module.exports = router;
