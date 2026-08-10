




const jwt = require("jsonwebtoken")


const asyncHandler = require("express-async-handler")






const verifyToken = asyncHandler (async ( req , res , next) => {



const authHeader = req.headers.authorization


if(!authHeader || !authHeader.startsWith("Bearer ")){

return res.status(401).json("No token provided")

}


const token = authHeader.replace("Bearer " , "")

try{


 const decode = jwt.verify( token , process.env.ACCESS_TOKEN )   

req.user = { _id: decode.userID }

next()

}


catch(err){

return res.status(401).json({ message : "token is invailed" })

}
 
})





module.exports = verifyToken





