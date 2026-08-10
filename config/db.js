


const mongoose = require("mongoose")



const connected = async() => {

try{


await mongoose.connect(process.env.DB_URL)

console.log("MongoDB Connected")

}

catch(err){


console.log(err.message || "MongoDB connection failed")

process.exit(1) // اقفل سيرفر لو فية ايرورر
}


}


module.exports = connected
