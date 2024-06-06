const { User } = require("../db/sequelizeSetup")
const { UniqueConstraintError, ValidationError } = require("sequelize")
const bcrypt = require("bcrypt")

const findAllUsers = (req, res) => {
  User.findAll()
    .then((results) => {
      res.json(results)
    })
    .catch((error) => {
      res.status(500).json(error.message)
    })
}

const findUserByPk = (req, res) => {
  User.findByPk(parseInt(req.params.id))
    .then((result) => {
      if (result) {
        res.json({ message: "Un utilisateur a été trouvé.", data: result })
      } else {
        res.status(404).json({ message: `Aucun utilisateur n'a été trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Une erreur est survenue.", data: error.message })
    })
}

const createUser = (req, res) => {
  const { username, password, RoleId } = req.body

  // Crée un utilisateur en premier pour vérifier les validations sans hachage
  User.build({ username, password, RoleId })
    .validate()
    .then(() => {
      // Si la validation réussit, hache le mot de passe et crée l'utilisateur
      return bcrypt.hash(password, 10)
    })
    .then((hash) => {
      return User.create({ username, password: hash, RoleId })
    })
    .then((user) => {
      user.password = ""
      res.status(201).json({ message: `L'utilisateur a bien été créé`, data: user })
    })
    .catch((error) => {
      console.error("Erreur lors de la création de l'utilisateur :", error)
      if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
        return res.status(400).json({ message: error.message })
      }
      res.status(500).json({ message: `L'utilisateur n'a pas pu être créé`, data: error.message })
    })
}

const updateUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        if (req.body.password) {
          // Hache le nouveau mot de passe avant de le sauvegarder
          return bcrypt.hash(req.body.password, 10).then((hash) => {
            req.body.password = hash

            // Empêche l'utilisateur de mettre à jour son nom d'utilisateur
            req.body.username = result.username

            return result.update(req.body).then(() => {
              res
                .status(201)
                .json({ message: `L'utilisateur a bien été mis à jour.`, data: result }) // Renvoie l'utilisateur mis à jour
            })
          })
        }
      } else {
        res.status(404).json({ message: `Aucun utilisateur à mettre à jour n'a été trouvé.` }) // Gère le cas où aucun utilisateur n'est trouvé
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

const deleteUser = (req, res) => {
  User.findByPk(req.params.id)
    .then((result) => {
      if (result) {
        return result.destroy().then((result) => {
          res.json({ mesage: `L'utilisateur a bien été supprimé.`, data: result })
        })
      } else {
        res.status(404).json({ mesage: `Aucun utilisateur trouvé.` })
      }
    })
    .catch((error) => {
      res.status(500).json({ mesage: `La requête n'a pas aboutie.`, data: error.message })
    })
}

module.exports = { findAllUsers, findUserByPk, createUser, updateUser, deleteUser }
