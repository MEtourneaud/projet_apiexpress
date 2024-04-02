module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "User",
    {
      // Colonne "username": Nom d'utilisateur
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom d'utilisateur est déjà pris", // Doit être unique
        },
        validate: {
          len: {
            // Validation de la longueur du nom d'utilisateur
            msg: "Le nom d'utilisateur doit avoir un nombre de caractères compris entre 3 et 40.",
            args: [3, 40], // Longueur minimale et maximale autorisée
          },
        },
      },
      // mail: {
      //   type: DataTypes.STRING,
      //   validate: {
      //     isEmail: true,
      //   },
      // },
      // Colonne "password": Mot de passe de l'utilisateur
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      onDelete: "CASCADE",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
    }
  )
}
