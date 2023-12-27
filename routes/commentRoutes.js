const express = require("express")
const router = express.Router()
const {
  findAllComments,
  findCommentByPk,
  createComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentControllers")
const { protect, restrictToOwnUser } = require("../controllers/authControllers")
const { Comment } = require("../db/sequelizeSetup")

router.route("/").get(findAllComments).post(protect, createComment)

router
  .route("/:id")
  .get(findCommentByPk)
  .put(protect, restrictToOwnUser(Comment), updateComment)
  .delete(protect, restrictToOwnUser(Comment), deleteComment)

module.exports = router
