const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroController");

router.get("/list", heroController.listHeroes);
router.get("/:name", heroController.getHeroByName);

module.exports = router;
