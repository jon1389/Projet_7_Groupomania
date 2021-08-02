const express = require("express");
const router = express.Router();

const userCtrl = require("../controllers/userController");
const multer = require("../middlewares/multer-config");
const auth = require("../middlewares/auth");

router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.getCurrentUser);
// router.put("/profile", multer, userCtrl.modifyUser);
router.delete("/delete/:id", auth, userCtrl.deleteCurrentUser);

module.exports = router;
