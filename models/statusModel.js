module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Status", {
    label: {
      type: DataTypes.STRING,
    },
  })
}
