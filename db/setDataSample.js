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

module.exports = { setUsers }
