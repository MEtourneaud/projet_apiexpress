const { UniqueConstraintError, ValidationError, QueryTypes } = require("sequelize")
const { Manga, User, Review, sequelize } = require("../db/sequelizeSetup")

const findAllMangas = (req, res) => {
  Manga.findAll({ include: [Review, User] })
    .then((mangas) => {
      res.json(mangas)
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const findAllMangasRawSQL = (req, res) => {
  console.log("Avant la requête SQL :", sequelize)
  sequelize
    .query("SELECT title, rating FROM mangas LEFT JOIN reviews ON mangas.id = reviews.MangaId", {
      type: QueryTypes.SELECT,
    })
    .then((mangas) => {
      console.log("Après la requête SQL :", sequelize)
      res.json(mangas)
    })
    .catch((error) => {
      console.error("Erreur SQL :", error)
      res.status(500).json(error.message)
    })
}

const findMangaByPk = (req, res) => {
  Manga.findByPk(parseInt(req.params.id))
    .then((manga) => {
      if (manga) {
        res.json({ message: "Un manga a été trouvé.", data: manga })
      } else {
        res.status(404).json({ message: `Aucun manga n'a été trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const createManga = (req, res) => {
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
      }
      const newManga = { ...req.body, UserId: user.id }

      Manga.create(newManga)
        .then((manga) => {
          res.status(201).json({ message: "Le manga a bien été créé", data: manga })
        })
        .catch((error) => {
          if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
          }
          res.status(500).json({ message: `Le manga n'a pas pu être créé`, data: error.message })
        })
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const createMangaWithImg = (req, res) => {
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
      }
      console.log(req.file)
      const newManga = {
        ...req.body,
        UserId: user.id,
        imageUrl: `${req.protocol}://${req.get("host")}/uploadedFiles/${req.file.filename}`,
      }

      Manga.create(newManga)
        .then((manga) => {
          res.status(201).json({ message: "Le manga a bien été créé", data: manga })
        })
        .catch((error) => {
          if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(400).json({ message: error.message })
          }
          res.status(500).json({ message: `Le manga n'a pas pu être créé`, data: error.message })
        })
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const updateManga = (req, res) => {
  Manga.findByPk(req.params.id)
    .then((manga) => {
      if (manga) {
        return manga.update(req.body).then(() => {
          res.status(201).json({ message: "Le manga a bien été mis à jour.", data: manga })
        })
      } else {
        res.status(404).json({ message: `Aucun manga à mettre à jour n'a été trouvé.` })
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const updateMangaWithImg = (req, res) => {
  Manga.findByPk(req.params.id)
    .then((manga) => {
      if (manga) {
        return manga
          .update({
            ...req.body,
            imageUrl: `${req.protocol}://${req.get("host")}/uploadedFiles/${req.file.filename}`,
          })
          .then(() => {
            res.status(201).json({ message: "Le manga a bien été mis à jour.", data: manga })
          })
      } else {
        res.status(404).json({ message: `Aucun manga à mettre à jour n'a été trouvé.` })
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const deleteManga = (req, res) => {
  Manga.findByPk(req.params.id)
    .then((manga) => {
      if (manga) {
        return manga.destroy().then((manga) => {
          res.json({ mesage: `Le manga a bien été supprimé.`, data: manga })
        })
      } else {
        res.status(404).json({ mesage: `Aucun manga trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
    })
}

module.exports = {
  findAllMangas,
  findAllMangasRawSQL,
  findMangaByPk,
  createManga,
  createMangaWithImg,
  updateManga,
  updateMangaWithImg,
  deleteManga,
}
