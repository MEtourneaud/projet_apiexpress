const express = require("express")
const router = express.Router()
const {
  findAllMangas,
  findMangaByPk,
  createManga,
  updateManga,
  deleteManga,
} = require("../controllers/mangaControllers")
const { protect, restrictToOwnUser } = require("../controllers/authControllers")
const { Manga } = require("../db/sequelizeSetup")

router.route("/").get(findAllMangas).post(protect, createManga)

// router.route("/rawsql").get(findAllCoworkingsRawSQL)

// router.route("/withImg").post(protect, multer, createCoworkingWithImg)

router
  .route("/:id")
  .get(findMangaByPk)
  .put(protect, restrictToOwnUser(Manga), updateManga)
  .delete(protect, restrictToOwnUser(Manga), deleteManga)

// router
//   .route("/withImg/:id")
//   .put(protect, restrictToOwnUser(Coworking), multer, updateCoworkingWithImg)

module.exports = router
