const express = require("express")
const router = express.Router()
const {
  findAllMangas,
  findAllMangasRawSQL,
  findMangaByPk,
  createManga,
  createMangaWithImg,
  updateManga,
  updateMangaWithImg,
  deleteManga,
} = require("../controllers/mangaControllers")
const { protect, restrictToOwnUser } = require("../controllers/authControllers")
const { Manga } = require("../db/sequelizeSetup")
const multer = require("../middleware/multer-config")

router.route("/").get(findAllMangas).post(protect, createManga)

router.route("/rawsql").get(findAllMangasRawSQL)

router.route("/withImg").post(protect, multer, createMangaWithImg)

router
  .route("/:id")
  .get(findMangaByPk)
  .put(protect, restrictToOwnUser(Manga), updateManga)
  .delete(protect, restrictToOwnUser(Manga), deleteManga)

router.route("/withImg/:id").put(protect, restrictToOwnUser(Manga), multer, updateMangaWithImg)

module.exports = router
