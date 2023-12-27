const { Sequelize, DataTypes } = require("sequelize")
const RoleModel = require("../models/roleModel")
const UserModel = require("../models/userModel")
const MangaModel = require("../models/mangaModel")
const StatusModel = require("../models/statusModel")
const CommentModel = require("../models/commentModel")
const { setUsers, setRoles, setMangas, setStatus } = require("./setDataSample")

const sequelize = new Sequelize("projet_mangas", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
})

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Manga = MangaModel(sequelize, DataTypes)
const Status = StatusModel(sequelize, DataTypes)
const Comment = CommentModel(sequelize, DataTypes)

Role.hasMany(User)
User.belongsTo(Role)

User.belongsToMany(Manga, { through: Comment })
Manga.belongsToMany(User, { through: Comment })

Manga.hasMany(Comment, {
  foreignKey: {
    allowNull: false,
  },
})
Comment.belongsTo(Manga)

User.hasMany(Comment)
Comment.belongsTo(User)

sequelize
  .sync({ force: true })
  .then(async () => {
    await setRoles(Role)
    await setUsers(User)
    await setMangas(Manga)
    await setStatus(Status)
  })
  .catch((error) => {
    console.log(error)
  })

sequelize
  .authenticate()
  .then(() => console.log("La connexion à la base de données a bien été établie."))
  .catch((error) => console.error(`Impossible de se connecter à la base de données ${error}`))

module.exports = { User, Role, Manga, Comment }
