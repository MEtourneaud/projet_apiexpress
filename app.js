const express = require("express")
const morgan = require("morgan")
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.json("Hello World !!!")
})

const userRouter = require("./routes/userRoutes")
const mangaRouter = require("./routes/mangaRoutes")
const commentRouter = require("./routes/commentRoutes")

app.use("/api/users", userRouter)
// app.use("/api/mangas", mangaRouter)
// app.use("/api/comments", commentRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
