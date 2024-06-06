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
  // Extraction des données de la requête
  const { username, password } = req.body

  // Recherche de l'utilisateur avec le champ 'username' et inclusion du mot de passe
  User.scope("withPassword")
    .findOne({ where: { username } })
    .then((user) => {
      // Si l'utilisateur n'est pas trouvé, renvoyer une réponse avec un statut 404
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé" })
      }

      // Comparaison du mot de passe fourni avec celui stocké dans la base de données
      bcrypt.compare(password, user.password).then((isValid) => {
        // Si le mot de passe est incorrect, renvoyer une réponse avec un statut 401
        if (!isValid) {
          return res.status(401).json({ message: "Mot de passe incorrect" })
        }

        // Récupérer le rôle de l'utilisateur à partir de son ID
        Role.findByPk(user.RoleId).then((role) => {
          // Création d'un token JWT avec les informations de l'utilisateur et son rôle
          const token = jwt.sign(
            {
              id: user.id,
              username: user.username,
              roles: [role.label],
            },
            SECRET_KEY, // Clé secrète pour signer le JWT
            { expiresIn: "2h" } // Le token expire dans 2 heures
          )

          // Renvoyer une réponse avec un message de succès et le token
          res.json({ message: "Connexion réussie", data: token })
        })
      })
    })
    .catch((error) => {
      // Gestion des erreurs et renvoi d'une réponse avec un statut 500
      res.status(500).json({ message: "Erreur interne" })
    })
}

// Fonction middleware pour protéger les routes nécessitant une authentification
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization // Récupérez l'en-tête d'autorisation
  if (!authHeader) {
    // Si l'en-tête d'autorisation est manquant, renvoyer une réponse avec un statut 401
    return res.status(401).json({ message: "Vous n'êtes pas authentifié." })
  }

  const token = authHeader.split(" ")[1] // Obtenez le JWT
  if (!token) {
    // Si le token est manquant, renvoyer une réponse avec un statut 401
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
