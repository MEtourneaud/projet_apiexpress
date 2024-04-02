// Importe les données les fichiers "mock"
const mockUsers = require("./mock-users")
const mockMangas = require("./mock-mangas")

// Importe le module bcrypt pour le hachage sécurisé des mots de passe
const bcrypt = require("bcrypt")

// Fonction pour créer des rôles dans la base de données
const setRoles = (Role) => {
  return Promise.all([
    Role.create({ label: "superadmin" }),
    Role.create({ label: "admin" }),
    Role.create({ label: "edit" }),
  ])
}

// Fonction pour créer des utilisateurs dans la base de données
const setUsers = (User) => {
  return Promise.all(
    mockUsers.map((user) => {
      return bcrypt.hash(user.password, 10).then((hasResult) => {
        User.create({ ...user, password: hasResult })
          .then(() => {})
          .catch((error) => {
            console.log(error.message)
          })
      })
    })
  )
}

// Fonction pour créer des mangas dans la base de données
const setMangas = (Manga) => {
  return Promise.all(
    mockMangas.map((manga) => {
      const newManga = { ...manga, id: null }
      return Manga.create(newManga)
        .then(() => {})
        .catch((error) => {
          console.log(error.message)
        })
    })
  )
}

// Fonction pour créer des statuts dans la base de données
const setStatus = (Status) => {
  return Promise.all([
    // Crée cinq statuts avec les étiquettes spécifiées
    Status.create({ status: "Completed" }),
    Status.create({ status: "Reading" }),
    Status.create({ status: "On hold" }),
    Status.create({ status: "Dropped" }),
    Status.create({ status: "Plan to read" }),
  ])
}

module.exports = { setUsers, setRoles, setMangas, setStatus }
