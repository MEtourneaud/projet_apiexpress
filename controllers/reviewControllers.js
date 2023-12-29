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
  Review.findByPk(parseInt(req.params.id))
    .then((review) => {
      if (review) {
        res.json({ message: "Un commentaire a été trouvé.", data: review })
      } else {
        res.status(404).json({ message: `Aucun commentaire n'a été trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const createReview = (req, res) => {
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
      }
      return Review.create({ ...req.body, UserId: user.id }).then((review) => {
        res.json({ message: `Le commentaire a bien été créé.`, data: review })
      })
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: error.message })
    })
}

const updateReview = (req, res) => {
  Review.findByPk(req.params.id)
    .then((review) => {
      if (review) {
        return review.update(req.body).then(() => {
          res.status(201).json({ message: "Le commentaire a bien été mis à jour.", data: review })
        })
      } else {
        res.status(404).json({ message: `Aucun commentaire à mettre à jour n'a été trouvé.` })
      }
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const deleteReview = (req, res) => {
  Review.findByPk(req.params.id)
    .then((review) => {
      if (review) {
        return review.destroy().then((review) => {
          res.json({ mesage: `Le commentaire a bien été supprimé.`, data: review })
        })
      } else {
        res.status(404).json({ mesage: `Aucun commentaire trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
    })
}

module.exports = { findAllReviews, findReviewByPk, createReview, updateReview, deleteReview }
