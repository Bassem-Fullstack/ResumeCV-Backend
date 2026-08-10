


const mongoose = require("mongoose")




const userSchema = new mongoose.Schema({


username : {

 type : String ,

 required : true ,

 trim : true 

} ,


email : {

 type : String ,

 required : true ,

 unique : true ,

 trim : true ,

 lowercase : true 

} ,


password : {

 type : String ,

 minlength : 8 ,

 required : true ,

 trim : true

},


refreshTokens : [

 {

    type : String 
 }

]



} 

, {timestamps : true})




module.exports = mongoose.model("User" , userSchema)











