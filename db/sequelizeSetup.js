// Importe les classes Sequelize et DataTypes depuis le module "sequelize"
const { Sequelize, DataTypes } = require("sequelize")

// Importe les modèles de différentes entités
const RoleModel = require("../models/roleModel")
const UserModel = require("../models/userModel")
const MangaModel = require("../models/mangaModel")
const StatusModel = require("../models/statusModel")
const ReviewModel = require("../models/reviewModel")

// Importe des fonctions de réglage des données d'échantillonnage depuis un fichier nommé "setDataSample"
const { setUsers, setRoles, setMangas, setStatus } = require("./setDataSample")

// Initialise une nouvelle instance de Sequelize pour se connecter à la base de données avec les paramètres spécifiés
const sequelize = new Sequelize("projet_mangas", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  logging: false,
})

// Instancie un Model qui permettra d'interpréter le Javascript avec la Table SQL correspondante
const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Manga = MangaModel(sequelize, DataTypes)
const Status = StatusModel(sequelize, DataTypes)
const Review = ReviewModel(sequelize, DataTypes)

// Définit les relations entre les entités en utilisant les méthodes Sequelize
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

Status.hasMany(Manga)
Manga.belongsTo(Status)

// Synchronise les modèle avec la base de données et crée les tables si elles n'existent pas déjà
sequelize
  .sync({ force: true })
  .then(async () => {
    await setRoles(Role)
    await setUsers(User)
    await setStatus(Status)
    await setMangas(Manga)
  })
  .catch((error) => {
    console.log(error)
  })

// Vérifie la connexion à la base de données
sequelize
  .authenticate()
  .then(() => console.log("La connexion à la base de données a bien été établie."))
  .catch((error) => console.error(`Impossible de se connecter à la base de données ${error}`))

// Exporte les instances de modèles et l'instance Sequelize pour les rendre disponibles dans d'autres fichiers
module.exports = { User, Role, Manga, Review, Status, sequelize }
