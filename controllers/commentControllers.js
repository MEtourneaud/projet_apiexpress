const { ValidationError } = require("sequelize")
const { Comment, User } = require("../db/sequelizeSetup")

const findAllComments = (req, res) => {
  Comment.findAll({ include: User })
    .then((comments) => {
      res.json(comments)
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const findCommentByPk = (req, res) => {
  Comment.findByPk(parseInt(req.params.id))
    .then((comment) => {
      if (comment) {
        res.json({ message: "Un commentaire a été trouvé.", data: comment })
      } else {
        res.status(404).json({ message: `Aucun commentaire n'a été trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const createComment = (req, res) => {
  User.findOne({ where: { username: req.username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: `L'utilisateur n'a pas été trouvé.` })
      }
      return Comment.create({ ...req.body, UserId: user.id }).then((result) => {
        res.json({ message: `Le commentaire a bien été créé.`, data: result })
      })
    })
    .catch((error) => {
      if (error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: error.message })
    })
}

const updateComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        return result.update(req.body).then(() => {
          res.status(201).json({ message: "Le commentaire a bien été mis à jour.", data: result })
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

const deleteComment = (req, res) => {
  Comment.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        return result.destroy().then((result) => {
          res.json({ mesage: `Le commentaire a bien été supprimé.`, data: result })
        })
      } else {
        res.status(404).json({ mesage: `Aucun commentaire trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
    })
}

module.exports = { findAllComments, findCommentByPk, createComment, updateComment, deleteComment }
