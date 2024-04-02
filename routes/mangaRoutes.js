const express = require("express") // Importation du framework Express
const router = express.Router() // Création d'un routeur Express
const {
  findAllMangas,
  findAllMangasRawSQL,
  findMangaByPk,
  createManga,
  updateManga,
  deleteManga,
  addMangaToProfileUser,
} = require("../controllers/mangaControllers")
// Importation des fonctions de protection et de restriction d'accès
const { protect, restrictToOwnUser } = require("../controllers/authControllers")
// Importation du modèle Manga défini avec Sequelize
const { Manga } = require("../db/sequelizeSetup")
// Importation du middleware Multer pour la gestion des fichiers
const multer = require("../middleware/multer-config")

// Définition des routes pour les mangas

// Route pour obtenir tous les mangas et pour créer un nouveau manga
router.route("/").get(findAllMangas).post(protect, multer, createManga)

// Route pour obtenir tous les mangas avec une requête SQL brute
router.route("/rawsql").get(findAllMangasRawSQL)

// Routes pour obtenir, mettre à jour et supprimer un manga par son ID
router
  .route("/:id")
  .get(findMangaByPk) // Obtenir un manga par son ID
  .put(protect, restrictToOwnUser(Manga), multer, updateManga) // Mettre à jour un manga par son ID
  .delete(protect, restrictToOwnUser(Manga), deleteManga) // Supprimer un manga par son ID

// Route pour ajouter un manga au profil de l'utilisateur
router.route("/addMangaToProfile/:id").post(protect, addMangaToProfileUser)

// Exportation du routeur Express contenant les routes pour les mangas
module.exports = router
