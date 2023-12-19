const express = require("express")
const router = express.Router()
const {
  findAllUsers,
  createUser,
  findUserByPk,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers")
const { login, protect, restrict, correctUser } = require("../controllers/authControllers")

router.route("/").get(findAllUsers).post(createUser)

router
  .route("/:id")
  .get(findUserByPk)
  .put(protect, correctUser, restrict, updateUser)
  .delete(protect, restrict, deleteUser)

module.exports = router
