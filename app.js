const express = require("express")
const morgan = require("morgan")
const app = express()
const port = 3000

app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.send("Hello World !!!")
})

const userRouter = require("./routes/userRoutes")

app.use("/api/users", userRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
