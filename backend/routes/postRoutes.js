const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-post");

router.get("/", postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getCurrentPost);
router.delete("/delete/:id", postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.post("/", auth, multer, postCtrl.createPost);

module.exports = router;
