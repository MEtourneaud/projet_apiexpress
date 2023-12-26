const mockUsers = require("./mock-users")
const bcrypt = require("bcrypt")

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

const setRoles = (Role) => {
  return Promise.all([
    Role.create({ label: "superadmin" }),
    Role.create({ label: "admin" }),
    Role.create({ label: "edit" }),
  ])
}

module.exports = { setUsers, setRoles }
