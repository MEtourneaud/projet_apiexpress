const express = require("express") // Importation du module Express
const morgan = require("morgan") // Importation du module Morgan pour le logging
const cors = require("cors") // Importation du module Cors pour la gestion des CORS
const app = express() // Création d'une instance d'Express
const port = 3000 // Numéro de port sur lequel l'application écoutera les requêtes

// Options CORS pour autoriser les requêtes provenant de l'URL spécifiée
const corsOptions = {
  origin: "http://localhost:3001", // Remplacez par l'URL de votre client
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(express.json()) // Middleware pour parser le corps des requêtes en JSON
app.use(morgan("dev")) // Middleware pour afficher les logs des requêtes HTTP dans la console
app.use(cors(corsOptions)) // Middleware pour activer CORS avec les options spécifiées

app.get("/", (req, res) => {
  res.json("Hello World !!!") // Route racine qui renvoie "Hello World !!!" en JSON
})

const userRouter = require("./routes/userRoutes") // Importation du routeur des utilisateurs
const mangaRouter = require("./routes/mangaRoutes") // Importation du routeur des mangas
const reviewRouter = require("./routes/reviewRoutes") // Importation du routeur des avis

app.use("/api/users", userRouter) // Utilisation du routeur des utilisateurs avec le préfixe "/api/users"
app.use("/api/mangas", mangaRouter) // Utilisation du routeur des mangas avec le préfixe "/api/mangas"
app.use("/api/reviews", reviewRouter) // Utilisation du routeur des avis avec le préfixe "/api/reviews"

app.use("/images", express.static(__dirname + "/images")) // Middleware pour servir les fichiers statiques depuis le répertoire "images"

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`) // Démarrage du serveur et affichage d'un message dans la console
})

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack) // Affichage de l'erreur dans la console
  res.status(500).send("Something went wrong!") // Réponse avec le code d'erreur 500 et un message générique
})
