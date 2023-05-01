const express=require("express");
const { connection } = require("./db");
const jwt = require('jsonwebtoken');
const { noteRouter } = require("./Routes/Notes.routes");
var cors = require('cors');
const { userRouter } = require("./Routes/User.routes");
const { auth } = require("./middleware/auth.middleware");
require('dotenv').config()
const app =express();
app.use(express.json());
app.use(cors())
app.get("/mongo",(req,res)=>{
    res.send("Home Page")

})
app.use("/users",userRouter)


//Proctected
app.use(auth)
app.use("/notes",noteRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Conected to Database")
        
    } catch (error) {
        console.log(error)
    }
})