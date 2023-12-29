const express = require("express")
const router = express.Router()
const {
  findAllReviews,
  findReviewByPk,
  createReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers")
const { protect, restrictToOwnUser } = require("../controllers/authControllers")
const { Comment } = require("../db/sequelizeSetup")

router.route("/").get(findAllReviews).post(protect, createReview)

router
  .route("/:id")
  .get(findReviewByPk)
  .put(protect, restrictToOwnUser(Comment), updateReview)
  .delete(protect, restrictToOwnUser(Comment), deleteReview)

module.exports = router
