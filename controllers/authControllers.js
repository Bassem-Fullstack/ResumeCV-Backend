




const User = require("../models/User")


const asyncHandler = require("express-async-handler") 


const bcryptjs = require("bcryptjs")


const jwt = require("jsonwebtoken")






const registerUsers = asyncHandler(async ( req , res) => {


const { username , email , password } = req.body 


const userExist = await User.findOne({ email })

if(userExist) {

return res.status(400).json({ message : "User already exists , please login" })

}


const hashPassword = await bcryptjs.hash(password , 10) 

const addUser = await User.create({

username ,

email ,

password : hashPassword 


})


res.status(201).json({ success : true , user : {

username : addUser.username ,

email : addUser.email 


}})


})



///////////////////////////////////////////////////////////////////////////////////



const loginUsers = asyncHandler( async( req ,res) => {



const { email , password } = req.body


const getUser = await User.findOne({ email }) 

if(!getUser){

 return res.status(400).json({ message : "Invalid email or password" })

}


const isMatch = await bcryptjs.compare(password , getUser.password)

if(!isMatch){

return res.status(400).json({ message : "Invalid email or password" })  

}


const refreshToken = jwt.sign(

 { userID : getUser._id } , 
 
  
 process.env.REFRESH_TOKEN ,

 { expiresIn : "128d" }


 )


getUser.refreshTokens = refreshToken

await getUser.save()


const accessToken = jwt.sign(

{ userID : getUser._id } ,

process.env.ACCESS_TOKEN ,

{expiresIn : "15m"}

)

const isProduction = process.env.NODE_ENV === "production";

res.cookie("refreshToken", refreshToken, {
  httpOnly: true,
  secure: isProduction, 
  sameSite: isProduction ? "none" : "lax", 
  path: "/",
  expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
});

res.status(200).json({

  success: true ,
  
  accessToken


})



})



//////////////////////////////////////////////////////////////////////////////////////////// 


const refershToken = asyncHandler ( async ( req , res ) => {


const getRefershToken = req.cookies.refreshToken 


if(!getRefershToken) {

return res.status(401).json({ message : "Token is required"})

}


// طبعا عشان ايرور بتاع مكتبة توكين دة بترمي ايرور فجأة لسيرفر بسبب ان ريفريش توكين صلاحيتة خلصت او توكين مش شغال استخدمت تراي والكاتش عشان اي ايرورر يترمي لكاتش وميوقفليش السيرفر كلة

let decode ; // عرفت متغير برة عشان هستخدموة في كذا عملية في تراي وفي الكاتش وفي انشاء اكسيس توكين جديد

try{

 decode = jwt.verify( getRefershToken , process.env.REFRESH_TOKEN)

}


catch(err){

return res.status(401).json({ message : "Invalid or expire Refresh Token"})

}


const getUser = await User.findOne({

 _id : decode.userID ,

 refreshTokens : getRefershToken

})


if (!getUser) {

  return res.status(401).json({ message: "Invalid Refresh Token" });

}


const newAccessToken = jwt.sign( 

  { userID : getUser._id } ,

  process.env.ACCESS_TOKEN ,

  {expiresIn : "15m"}
 

 )


res.status(200).json({

success : true ,

accessToken : newAccessToken

})



})




/////////////////////////////////////////////////////////////////////////////////////////////// 



const logout = asyncHandler ( async ( req , res) => {


const id = req.user._id 


const getUser = await User.findById(id) 


if(!getUser){

 return res.status(400).json({ message : "User Not Found" })

} 


getUser.refreshTokens = undefined


await getUser.save()

const isProduction = process.env.NODE_ENV === "production";

res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  path: "/" // 👈 مهم جداً تتأكد إن الـ path مكتوب هنا زي كود الإنشاء
});


res.status(200).json({

success : true ,

message : "Loggedout Successfully"

})


})



module.exports = { registerUsers , loginUsers , refershToken , logout }



















