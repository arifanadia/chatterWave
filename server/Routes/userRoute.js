const express = require("express");
const router = express.Router();
const { registerUser, loginUser, setAvatar } = require('../Controllers/userController')

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/set-avatar/:id", setAvatar);

module.exports = router;