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
      // Colonne "password": Mot de passe de l'utilisateur
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [8, 100], // minimum 8 caractères, maximum 100 caractères
            msg: "Le mot de passe doit contenir entre 8 et 100 caractères.",
          },
          isValidPassword(value) {
            // Définir une expression régulière pour valider le mot de passe
            const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,100}$/
            // Tester la valeur du mot de passe contre l'expression régulière
            if (!regex.test(value)) {
              // Si la valeur ne correspond pas à l'expression régulière, affiche une erreur avec un message descriptif
              throw new Error(
                "Le mot de passe doit contenir au moins une majuscule, un chiffre et un caractère spécial."
              )
            }
          },
        },
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
