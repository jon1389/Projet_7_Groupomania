const express = require("express");
const router = express.Router();

const dislikeCtrl = require("../controllers/dislikeController");
const auth = require("../middlewares/auth");

router.get("/", dislikeCtrl.findAllDisLikes);
router.get("/:id", dislikeCtrl.findDislikesById);
router.post("/dislike/:id", dislikeCtrl.createDislike);

module.exports = router;
