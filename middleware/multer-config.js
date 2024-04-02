// Importation du module Multer
const multer = require("multer")

// Définition des types MIME autorisés et de leurs extensions correspondantes
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "image/webp": "webp",
}

// Configuration du stockage des fichiers avec Multer
const storage = multer.diskStorage({
  // Spécifie le répertoire de destination où les fichiers seront sauvegardés
  destination: (req, file, callback) => {
    callback(null, "images") // Les fichiers seront sauvegardés dans le dossier "images"
  },
  // Définit le nom de fichier pour chaque fichier téléchargé
  filename: (req, file, callback) => {
    // Modifie le nom de fichier pour supprimer les espaces et conserve l'extension appropriée
    const name = file.originalname.split(" ").join("_")
    const extension = MIME_TYPES[file.mimetype] // Récupère l'extension en fonction du type MIME du fichier
    callback(null, name) // Appelle le callback avec le nom de fichier modifié
  },
})

module.exports = multer({ storage: storage }).single("image")
