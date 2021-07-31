const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/postController");
const auth = require("../middlewares/auth");
const multer = require("../middlewares/multer-post");

/////////// version Postman //////////
// router.post("/", postCtrl.createPost);
// router.get("/", postCtrl.getAllPosts);
// router.get("/:id", postCtrl.getCurrentPost);
// router.put("/:id", postCtrl.modifyPost);
// router.delete("/:id", postCtrl.deletePost);
// router.post("/", postCtrl.createPost);

/////////// version API //////////
router.get("/", postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getCurrentPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.put("/:id", auth, postCtrl.modifyPost);
router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id/like", auth, postCtrl.LikePost);

module.exports = router;
