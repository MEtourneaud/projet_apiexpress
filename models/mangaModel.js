module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Mangas",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom est déjà pris",
        },
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      volumeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Le nombre de volume doit être un entier",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      onDelete: "CASCADE",
    }
  )
}
