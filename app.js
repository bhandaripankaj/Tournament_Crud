const express = require("express")
const connectDb = require('./config/db')
const apiRouter = require("./src/routes")
const app = express()

connectDb()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
app.use('/api',apiRouter)
app.listen(3000,()=>{
    console.log("server is running.....")
})
