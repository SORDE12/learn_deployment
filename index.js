const express=require("express")
const { connection } = require("./db")
const cors=require("cors")
const { userRouter } = require("./routes/user.routes")
const { noteRouter } = require("./routes/note.router")
const { authantification } = require("./middleware/authantification.middleware")
require("dotenv").config()


const app=express()

app.use(express.json())

app.use(cors())


app.get("/", (req,res)=>{
    res.send("Home Page")
})

app.use("/users", userRouter)
app.use(authantification)
app.use("/notes", noteRouter)


app.listen(process.env.port, async()=>{
    try{
        await connection
        console.log("connected to db")
    }
    catch(err){
        console.log('err')
    }
  console.log(`run on port ${process.env.port}`)
})