const { ValidationError } = require("sequelize")
const { Review, User } = require("../db/sequelizeSetup")

const findAllReviews = (req, res) => {
  Review.findAll({ include: User })
    .then((reviews) => {
      res.json(reviews)
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const findReviewByPk = (req, res) => {
  const reviewId = parseInt(req.params.id, 10)
  if (isNaN(reviewId)) {
    // Assurez-vous que l'identifiant est un nombre
    return res.status(400).json({ message: "Identifiant de commentaire non valide." })
  }

  Review.findByPk(reviewId)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ message: `Aucun commentaire n'a été trouvé.` })
      }
      res.json({ message: "Un commentaire a été trouvé.", data: review })
    })
    .catch((error) => {
      res.status(500).json({
        message: "Une erreur est survenue lors de la recherche du commentaire.",
        data: error.message,
      })
    })
}

const createReview = (req, res) => {
  if (!req.username) {
    return res.status(400).json({ message: "Le nom d'utilisateur est manquant." })
  }

  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." })
      }

      Review.create({ ...req.body, UserId: user.id }).then((review) => {
        res.json({ message: "Le commentaire a été créé avec succès.", data: review })
      })
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur s'est produite.", data: error.message })
    })
}

const updateReview = (req, res) => {
  Review.findByPk(req.params.id)
    .then((review) => {
      if (!review) {
        return res
          .status(404)
          .json({ message: `Aucun commentaire à mettre à jour n'a été trouvé.` })
      }
      return review.update(req.body).then(() => {
        res.status(201).json({ message: "Le commentaire a bien été mis à jour.", data: review })
      })
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res
        .status(500)
        .json({ message: "Une erreur est survenue lors de la mise à jour.", data: error.message })
    })
}

const deleteReview = (req, res) => {
  Review.findByPk(req.params.id)
    .then((review) => {
      if (!review) {
        return res.status(404).json({ message: `Aucun commentaire trouvé.` }) // Correction de l'orthographe
      }
      return review.destroy().then((deletedReview) => {
        res.json({ message: `Le commentaire a bien été supprimé.`, data: deletedReview })
      })
    })
    .catch((error) => {
      res.status(500).json({ message: `La requête n'a pas abouti.`, data: error.message })
    })
}

module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview }
