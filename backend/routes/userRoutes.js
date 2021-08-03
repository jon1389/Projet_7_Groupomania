const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userController");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getCurrentUser);
router.delete("/delete/:id", auth, multer, userCtrl.deleteCurrentUser);

module.exports = router;
