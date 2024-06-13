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
    mockUsers.map(async (user) => {
      try {
        // Hash du mot de passe avec bcrypt
        const hashedPassword = await bcrypt.hash(user.password, 10)

        // Création de l'utilisateur avec le mot de passe hashé
        await User.create({ ...user, password: hashedPassword })
      } catch (error) {
        // Gestion des erreurs lors de la création de l'utilisateur
        console.error("Erreur lors de la création de l'utilisateur:", error.message)
      }
    })
  )
}

// Fonction pour créer des mangas dans la base de données
const setMangas = async (Manga) => {
  for (const manga of mockMangas) {
    const newManga = { ...manga, id: null }
    let retries = 3
    while (retries > 0) {
      const t = await Manga.sequelize.transaction()
      try {
        // Tentative d'insertion du nouveau manga dans une transaction
        await Manga.create(newManga, { transaction: t })

        // Validation de la transaction si l'insertion réussit
        await t.commit()
        break
      } catch (error) {
        // Annulation de la transaction en cas d'erreur, notamment les deadlocks
        await t.rollback()

        // Gestion spécifique des deadlocks pour réessayer l'insertion
        if (
          error.name === "SequelizeDatabaseError" &&
          error.parent &&
          error.parent.code === "ER_LOCK_DEADLOCK"
        ) {
          retries -= 1
          console.warn("Deadlock detected. Retrying...", retries, "attempts left.")
          if (retries === 0) {
            console.error("Max retries reached. Could not insert manga:", manga.title)
          }
        } else {
          // Gestion des autres erreurs potentielles
          console.error("Erreur lors de la création du manga:", error.message)
          break
        }
      }
    }
  }
}

module.exports = { setUsers, setRoles, setMangas }
