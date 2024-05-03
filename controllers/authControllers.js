// Importe les modèles User et Role depuis le fichier sequelizeSetup.js
const { User, Role } = require("../db/sequelizeSetup")

// Importe le module bcrypt pour le hachage sécurisé des mots de passe
const bcrypt = require("bcrypt")

// Importe le module jsonwebtoken pour la gestion des jetons JWT (JSON Web Token)
const jwt = require("jsonwebtoken")

// Importe la clé secrète pour la signature des jetons JWT depuis le fichier tokenData.js
const SECRET_KEY = require("../config/tokenData")

// Définit une hiérarchie de rôles pour restreindre l'accès à certaines fonctionnalités de l'application
const rolesHierarchy = {
  edit: ["edit"],
  admin: ["admin", "edit"],
  superadmin: ["superadmin", "admin", "edit"],
}

// Fonction pour gérer le processus de connexion des utilisateurs
const login = (req, res) => {
  const { username, password } = req.body

  User.scope("withPassword")
    .findOne({ where: { username } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" })
      }

      bcrypt.compare(password, user.password).then((isValid) => {
        if (!isValid) {
          return res.status(401).json({ message: "Mot de passe incorrect" })
        }

        // Récupérer le rôle de l'utilisateur
        Role.findByPk(user.RoleId).then((role) => {
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              roles: [role.label], // Inclure le rôle dans le JWT
            },
            SECRET_KEY,
            { expiresIn: "2h" }
          )

          res.json({ message: "Connexion réussie", data: token })
        })
      })
    })
    .catch((error) => {
      res.status(500).json({ message: "Erreur interne" })
    })
}

// Fonction middleware pour protéger les routes nécessitant une authentification
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization // Récupérez l'en-tête d'autorisation
  if (!authHeader) {
    return res.status(401).json({ message: "Vous n'êtes pas authentifié." })
  }

  const token = authHeader.split(" ")[1] // Obtenez le JWT
  if (!token) {
    return res.status(401).json({ message: "Le token d'authentification est manquant." })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) // Vérifiez et décodez le JWT
    req.username = decoded.username // Définissez le `username`
    next() // Passez au contrôleur suivant
  } catch (error) {
    return res.status(403).json({ message: "Le token n'est pas valide." })
  }
}

// Fonction middleware pour restreindre l'accès à certaines routes en fonction du rôle de l'utilisateur
const restrict = (labelRole) => {
  return (req, res, next) => {
    // Récupère l'utilisateur à partir de son nom d'utilisateur
    User.findOne({
      where: {
        username: req.username,
      },
    })
      .then((user) => {
        // Récupère le rôle de l'utilisateur
        Role.findByPk(user.RoleId)
          .then((role) => {
            // Vérifie si le rôle de l'utilisateur a les autorisations nécessaires
            if (rolesHierarchy[role.label].includes(labelRole)) {
              next() // Passe à la prochaine fonction middleware
            } else {
              res.status(403).json({ message: `Droits insuffisants` }) // Gère les cas où les autorisations sont insuffisantes
            }
          })
          .catch((error) => {
            console.log(error.message) // Gère les erreurs
          })
      })
      .catch((error) => {
        console.log(error) // Gère les erreurs
      })
  }
}

// Fonction middleware pour restreindre l'accès à certaines ressources en fonction du rôle de l'utilisateur
const restrictToOwnUser = (model) => {
  return (req, res, next) => {
    // Récupère l'utilisateur à partir de son nom d'utilisateur
    User.findOne({
      where: { username: req.username },
    })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: `Pas d'utilisateur trouvé.` })
        }
        // Récupère le rôle de l'utilisateur
        return Role.findByPk(user.RoleId).then((role) => {
          // Vérifie si l'utilisateur est autorisé à accéder à la ressource
          if (rolesHierarchy[role.label].includes("admin")) {
            return next()
          }
          // Si l'utilisateur n'est pas un administrateur, vérifie s'il est l'auteur de la ressource
          model
            .findByPk(req.params.id)
            .then((resource) => {
              if (!resource) return res.status(404).json({ message: `La ressource n'existe pas.` })
              if (user.id === resource.UserId) {
                next()
              } else {
                res.status(403).json({ message: `Vous n'êtes pas l'auteur de la ressource.` })
              }
            })
            .catch((error) => {
              return res.status(500).json({ message: error.message }) // Gère les erreurs
            })
        })
      })
      .catch((error) => console.log(error.message)) // Gère les erreurs
  }
}

// Fonction middleware pour restreindre l'accès à certaines ressources en fonction de l'utilisateur connecté
const correctUser = (req, res, next) => {
  // Récupère l'utilisateur à partir de son nom d'utilisateur
  User.findOne({ where: { username: req.username } })
    .then((authUser) => {
      // Vérifie si l'utilisateur est l'auteur de la ressource
      if (authUser.id === parseInt(req.params.id)) {
        next() // Passe à la prochaine fonction middleware
      } else {
        res.status(403).json({ message: "Droits insuffisants." }) // Gère les cas où les autorisations sont insuffisantes
      }
    })
    .catch((error) => {
      res.status(500).json({ message: error.message }) // Gère les erreurs
    })
}

module.exports = { login, protect, restrict, restrictToOwnUser, correctUser }
