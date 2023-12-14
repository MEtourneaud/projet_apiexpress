const express = require("express")
const router = express.Router()
const {
  findAllUsers,
  createUser,
  findUserByPk,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers")

router.route("/").get(findAllUsers).post(createUser)

router.route("/:id").get(findUserByPk).put(updateUser).delete(deleteUser)

module.exports = router
