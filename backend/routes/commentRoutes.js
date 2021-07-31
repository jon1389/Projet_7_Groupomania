const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/commentController");
const auth = require("../middlewares/auth");

// router.post("/", auth, multer, postCtrl.createPost);

/////////// version Postman //////////
router.post("/:idPost", commentCtrl.createComment);
router.get("/", commentCtrl.getAllComments);
router.get("/:id", commentCtrl.getCommentById);

// router.get("/", auth, postCtrl.getAllPosts);
// router.delete("/:id", auth, commentCtrl.deletePost);

module.exports = router;
