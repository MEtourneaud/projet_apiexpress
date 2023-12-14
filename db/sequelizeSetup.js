const { Sequelize, DataTypes } = require("sequelize")
const UserModel = require("../models/userModel")
const { setUsers } = require("./setDataSample")
const sequelize = new Sequelize("projet_mangas", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
})

const User = UserModel(sequelize, DataTypes)

sequelize
  .sync({ force: true })
  .then(async () => {
    await setUsers(User)
  })
  .catch((error) => {
    console.log(error)
  })

sequelize
  .authenticate()
  .then(() => console.log("La connexion à la base de données a bien été établie."))
  .catch((error) => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { User }
