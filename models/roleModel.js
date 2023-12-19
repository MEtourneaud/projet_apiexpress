module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Role",
    {
      label: {
        type: DataTypes.STRING,
      },
    },
    {
      updateAt: false,
      createdAt: false,
    }
  )
}
