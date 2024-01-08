const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 3000

const corsOptions = {
  origin: "http://localhost:3001", // Remplacez par l'URL de votre client
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
}

app.use(express.json())
app.use(morgan("dev"))
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.json("Hello World !!!")
})

const userRouter = require("./routes/userRoutes")
const mangaRouter = require("./routes/mangaRoutes")
const reviewRouter = require("./routes/reviewRoutes")

app.use("/api/users", userRouter)
app.use("/api/mangas", mangaRouter)
app.use("/api/reviews", reviewRouter)

app.use("/images", express.static(__dirname + "/images"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})
