// Importation des classes Sequelize et DataTypes depuis le module "sequelize"
const { Sequelize, DataTypes } = require("sequelize")

// Importation des modèles de différentes entités
const RoleModel = require("../models/roleModel")
const UserModel = require("../models/userModel")
const MangaModel = require("../models/mangaModel")
const ReviewModel = require("../models/reviewModel")

// Importation des données d'échantillonnage
const { setUsers, setRoles, setMangas } = require("./setDataSample")

// Initialisation de Sequelize pour se connecter à la base de données
const sequelize = new Sequelize("projet_mangas", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
})

// Instanciation des modèles
const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Manga = MangaModel(sequelize, DataTypes)
const Review = ReviewModel(sequelize, DataTypes)

// Définition des relations entre les modèles
Role.hasMany(User)
User.belongsTo(Role)

User.belongsToMany(Manga, { through: Review })
Manga.belongsToMany(User, { through: Review })

Manga.hasMany(Review, {
  foreignKey: {
    allowNull: false,
  },
})
Review.belongsTo(Manga)

User.hasMany(Review)
Review.belongsTo(User)

// Synchronisation des modèles avec la base de données
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

// Vérification de la connexion à la base de données
sequelize
  .authenticate()
  .then(() => console.log("La connexion à la base de données a bien été établie."))
  .catch((error) => console.error(`Impossible de se connecter à la base de données ${error}`))

// Exportation des instances de modèles et de l'instance Sequelize
module.exports = { User, Role, Manga, Review, sequelize }
