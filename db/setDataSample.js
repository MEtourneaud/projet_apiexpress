const mockUsers = require("./mock-users")
const mockMangas = require("./mock-mangas")
const bcrypt = require("bcrypt")

const setRoles = (Role) => {
  return Promise.all([
    Role.create({ label: "superadmin" }),
    Role.create({ label: "admin" }),
    Role.create({ label: "edit" }),
  ])
}

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

module.exports = { setUsers, setRoles, setMangas }
