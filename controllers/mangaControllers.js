// Importe les modules nécessaires depuis sequelizeSetup.js et d'autres modules
const { UniqueConstraintError, ValidationError, QueryTypes } = require("sequelize")
const { Manga, User, Review, sequelize } = require("../db/sequelizeSetup")

// Fonction pour trouver et renvoyer tous les mangas avec les avis et les utilisateurs associés
const findAllMangas = (req, res) => {
  Manga.findAll({ include: [Review, User] })
    .then((mangas) => {
      res.json(mangas) // Renvoie les mangas trouvés
    })
    .catch((error) => {
      res.status(500).json(error.message) // Gère les erreurs
    })
}

// Fonction pour trouver et renvoyer tous les mangas en utilisant une requête SQL brute
const findAllMangasRawSQL = (req, res) => {
  console.log("Avant la requête SQL :", sequelize)
  sequelize
    .query("SELECT title, rating FROM mangas LEFT JOIN reviews ON mangas.id = reviews.MangaId", {
      type: QueryTypes.SELECT,
    })
    .then((mangas) => {
      console.log("Après la requête SQL :", sequelize)
      res.json(mangas) // Renvoie les mangas trouvés
    })
    .catch((error) => {
      console.error("Erreur SQL :", error)
      res.status(500).json(error.message) // Gère les erreurs
    })
}

// Fonction pour trouver et renvoyer un manga par son identifiant
const findMangaByPk = (req, res) => {
  Manga.findByPk(parseInt(req.params.id))
    .then((manga) => {
      if (manga) {
        res.json({ message: "Un manga a été trouvé.", data: manga }) // Renvoie le manga trouvé
      } else {
        res.status(404).json({ message: `Aucun manga n'a été trouvé.` }) // Gère le cas où aucun manga n'est trouvé
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message }) // Gère les erreurs
    })
}

// Fonction pour créer un nouveau manga
const createManga = (req, res) => {
  // Recherche l'utilisateur actuel dans la base de données
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
      }
      // Crée un nouveau manga avec les données fournies dans la requête
      const newManga = {
        ...req.body,
        UserId: user.id,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      }

      Manga.create(newManga)
        .then((manga) => {
          res.status(201).json({ message: "Le manga a bien été créé", data: manga }) // Renvoie le manga créé
        })
        .catch((error) => {
          // Gère les erreurs de validation ou de contrainte unique
          if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
            return res.status(401).json({ message: error.message })
          }
          res.status(500).json({ message: `Le manga n'a pas pu être créé`, data: error.message }) // Gère les autres erreurs
        })
    })
    .catch((error) => {
      res.status(500).json(error.message) // Gère les erreurs
    })
}

// Fonction pour mettre à jour un manga existant
const updateManga = (req, res) => {
  Manga.findByPk(req.params.id)
    .then((manga) => {
      if (manga) {
        // Vérifie si une nouvelle image a été fournie
        // if (req.file) {
        //   manga.imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        //   console.log("URL de l'image dans l'objet manga:", manga.imageUrl)
        // }

        // Vérifiez les données transmises à la méthode update
        //console.log("Données transmises à la méthode update:", req.body)

        //console.log("Avant l'appel à la méthode update")

        // Imprimez également les données de l'objet manga avant la mise à jour
        //console.log("Données de l'objet manga avant la mise à jour:", manga)

        // créer un objet qui contient req.body
        // et l'image uniquement si elle a été envoyyée

        let imageUrl = manga.imageUrl

        if (req.file) {
          imageUrl = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        }

        const mangaUpdate = {
          ...req.body,
          imageUrl,
        }

        return manga
          .update(mangaUpdate)
          .then(() => {
            //console.log("Après l'appel à la méthode update")
            // Imprimez les données de l'objet manga après la mise à jour
            //console.log("Données de l'objet manga après la mise à jour:", manga)
            res.status(201).json({ message: "Le manga a bien été mis à jour.", data: manga }) // Renvoie le manga mis à jour
          })
          .catch((error) => {
            console.error("Erreur lors de la mise à jour du manga :", error)
            res.status(500).json({ message: "Erreur lors de la mise à jour du manga." })
          })
      } else {
        res.status(404).json({ message: `Aucun manga à mettre à jour n'a été trouvé.` }) // Gère le cas où aucun manga n'est trouvé
      }
    })
    .catch((error) => {
      // Gère les erreurs de validation ou de contrainte unique
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message }) // Gère les autres erreurs
    })
}

// Fonction pour supprimer un manga existant
const deleteManga = (req, res) => {
  Manga.findByPk(req.params.id)
    .then((manga) => {
      if (manga) {
        // Supprime le manga de la base de données
        return manga.destroy().then((manga) => {
          res.json({ mesage: `Le manga a bien été supprimé.`, data: manga }) // Renvoie un message de succès
        })
      } else {
        res.status(404).json({ mesage: `Aucun manga trouvé.` }) // Gère le cas où aucun manga n'est trouvé
      }
    })
    .catch((error) => {
      res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message }) // Gère les erreurs
    })
}

//NON FONCTIONNEL POUR LE MOMENT
// Fonction pour ajouter un manga au profil de l'utilisateur
const addMangaToProfileUser = (req, res) => {
  console.log("Route /api/manga/addMangaToProfile atteinte")
  console.log("Paramètres reçus :", req.params)
  // Recherche l'utilisateur actuel dans la base de données
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
      }

      // Récupère l'ID du manga à partir des paramètres de la route
      const mangaId = req.params.id
      console.log("ID du manga :", mangaId)

      // Vérifie si le manga existe
      return Manga.findByPk(mangaId).then((manga) => {
        console.log("Manga trouvé :", manga)
        if (!manga) {
          return res.status(404).json({ message: `Le manga n'a pas été trouvé.` })
        }

        // Ajoute le manga au profil de l'utilisateur
        return user.addManga(manga).then(() => {
          res.status(201).json({ message: "Le manga a bien été ajouté au profil.", data: manga }) // Renvoie un message de succès
        })
      })
    })
    .catch((error) => {
      // Gère les erreurs de validation ou de contrainte unique
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      console.error("Erreur lors de la recherche du manga :", error)
      res.status(500).json({ message: `Une erreur est survenue.`, data: error.message }) // Gère les autres erreurs
    })
}

module.exports = {
  findAllMangas,
  findAllMangasRawSQL,
  findMangaByPk,
  createManga,
  updateManga,
  deleteManga,
  addMangaToProfileUser,
}
