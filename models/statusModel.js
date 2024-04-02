module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Label", {
    // Colonne "label": Status de lecture
    status: {
      type: DataTypes.STRING,
    },
  })
}
