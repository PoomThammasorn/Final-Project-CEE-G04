const express = require("express");
const postController = require("../controller/postController");
const commentController = require("../controller/commentController");

const router = express.Router();

router.get("/", postController.getPost);
router.delete("/:post_id", postController.deletePost);
router.post("/", postController.addPost);

router.get("/:post_id/comments", commentController.getComment);
router.post("/:post_id/comments", commentController.deleteComment);
router.delete(
  "/:post_id/comments/:comment_id",
  commentController.deleteComment
);

module.exports = router;
