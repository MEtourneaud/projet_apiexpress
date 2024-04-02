module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Role",
    {
      // Colonne "label": Libellé du rôle
      label: {
        type: DataTypes.STRING,
      },
    },
    {
      // Options du modèle pour empêcher la création des colonnes "createdAt" et "updatedAt"
      updatedAt: false, // Désactive la mise à jour automatique de la colonne "updatedAt"
      createdAt: false, // Désactive la création automatique de la colonne "createdAt"
    }
  )
}
