// Définition du modèle de données pour les mangas dans Sequelize.
module.exports = (sequelize, DataTypes) => {
  // Définition du modèle "Mangas" avec les différentes colonnes et leurs contraintes.
  return sequelize.define(
    "Mangas",
    {
      // Colonne "title": Titre du manga
      title: {
        type: DataTypes.STRING, // Type de données: chaîne de caractères
        allowNull: false, // Ne peut pas être nul
        unique: {
          msg: "Le nom est déjà pris", // Message d'erreur si la contrainte d'unicité échoue
        },
      },
      // Colonne "author": Auteur du manga
      author: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Colonne "synopsis": Synopsis du manga
      synopsis: {
        type: DataTypes.TEXT, // Type de données: texte
        allowNull: false,
      },
      // Colonne "genre": Genre du manga
      genre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Colonne "volumeNumber": Nombre de volume du manga
      volumeNumber: {
        type: DataTypes.INTEGER, // Type de données: nombre entier
        allowNull: false,
        validate: {
          isInt: {
            msg: "Le nombre de volume doit être un entier", // Message d'erreur si le nombre n'est pas un entier
          },
        },
      },
      // Colonne "imageUrl": URL de l'image du manga
      imageUrl: {
        type: DataTypes.STRING,
        unique: true, // Ajout de la contrainte d'unicité
      },
    },
    {
      onDelete: "CASCADE", // Supprimer en cascade les enregistrements liés lorsqu'un manga est supprimé
    }
  )
}
