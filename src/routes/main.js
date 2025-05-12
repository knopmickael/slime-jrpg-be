const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const userRouter = require("./users");
const heroRouter = require("./hero");

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/hero", heroRouter);

module.exports = router;
