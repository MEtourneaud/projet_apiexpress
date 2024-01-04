const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

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
