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
router.delete("/delete/:id", postCtrl.deletePost);
router.put("/:id", auth, multer, postCtrl.modifyPost);
router.post("/", auth, multer, postCtrl.createPost);

module.exports = router;
