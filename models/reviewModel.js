module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Review", {
    // Colonne "content": Contenu de l'avis
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Colonne "rating": Note de l'avis
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          msg: `La note ne peut pas être inférieure à 0`,
          args: [0], // Argument de validation: la note doit être supérieure ou égale à 0
        },
        max: {
          msg: `La note ne peut pas être supérieure à 5`,
          args: [5], // Argument de validation: la note doit être inférieure ou égale à 5
        },
      },
    },
  })
}
