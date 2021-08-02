const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/likeController");
const auth = require("../middlewares/auth");

router.get("/", likeCtrl.findAllLikes);
router.get("/:id", likeCtrl.findLikesById);
router.post("/like/:id", likeCtrl.createLike);

module.exports = router;
