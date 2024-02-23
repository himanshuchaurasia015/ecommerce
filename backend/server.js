const app=require("./app")
const dotenv=require("dotenv")
const connectDatabase=require("./config/datbase")
//config
dotenv.config({path:"backend/config/config.env"})
//connecting database
connectDatabase()



app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`)})
