const express = require("express");
const router = express.Router();

const authCtrl = require("../controllers/authController");
const multer = require("../middlewares/multer-config");

router.post("/signup", multer, authCtrl.signup);
router.post("/login", authCtrl.login);

module.exports = router;
