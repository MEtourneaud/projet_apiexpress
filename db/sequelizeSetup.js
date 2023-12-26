const { Sequelize, DataTypes } = require("sequelize")
const RoleModel = require("../models/roleModel")
const UserModel = require("../models/userModel")
const MangaModel = require("../models/mangaModel")
const { setUsers, setRoles, setMangas } = require("./setDataSample")

const sequelize = new Sequelize("projet_mangas", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
})

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Manga = MangaModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

sequelize
  .sync({ force: true })
  .then(async () => {
    await setRoles(Role)
    await setUsers(User)
    await setMangas(Manga)
  })
  .catch((error) => {
    console.log(error)
  })

sequelize
  .authenticate()
  .then(() => console.log("La connexion à la base de données a bien été établie."))
  .catch((error) => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { User, Role, Manga }
