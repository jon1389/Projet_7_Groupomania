const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/commentController");
const auth = require("../middlewares/auth");

router.post("/:idPost", auth, commentCtrl.createComment);
router.get("/", commentCtrl.getAllComments);
router.get("/:id", auth, commentCtrl.getCommentById);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
