


const dotenv = require("dotenv")


dotenv.config()

const express = require("express") 

const cors = require("cors")

const cookieParser = require("cookie-parser")

const connected = require("./config/db")

const authRouters = require("./routes/authRoutes")

const CVRouters = require("./routes/cvRoutes")


const app = express()

app.use(express.json())

app.use(cors({

origin : ( origin , callback) => {

 
if(!origin || origin.includes("http://localhost") || origin.endsWith(".vercel.app")) {

// !origin معناها لو طلب جايلك من سيرفر معين او اداة معينة زاي بوست مان اسحملوة عادي وعديهالوة ينفذ طلب بتاعوة

// لو طلب جايلك من لوكيل هوست فروند اند او اخرة بينتهي بفيرسيل ابب او جايلك من بوست مان اسمحلوة يبعت طلب عادي لو جاي من بوست مان او من فيرسيل او من فروند اند 

callback(null , true)

}

else{
 
 callback(new Error("Not allowed by CORS") , false)   

}

} ,

credentials : true 


}))

app.use(cookieParser())

const port = process.env.PORT || 5000 



////////////////////////////////////////////////////////////// 

app.use("/users" , authRouters)

///////////////////////////////////////////////////////////// 

app.use("/cv" , CVRouters)

//////////////////////////////////////////////////////////// 

app.get("/" , (req , res) => {

res.status(200).send("server is working") 

})

connected()

app.listen(port , () => {

console.log("server is working well")

})

























