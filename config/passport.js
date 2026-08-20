





const passPort = require("passport")

const GoogleStrategy = require("passport-google-oauth20").Strategy
 
const User = require("../models/User")




passPort.use(

new GoogleStrategy ({

 clientID : process.env.GOOGLE_CLIENT_ID ,

 clientSecret : process.env.GOOGLE_CLIENT_SECRET ,

 callbackURL : process.env.GOOGLE_CALLBACK_URL 


} ,



async (accessToken, refreshToken, profile, done ) => {


try {

let user = await User.findOne({ email : profile.emails[0].value })


if(!user) {


user = await User.create({

username : profile.displayName ,

email : profile.emails[0].value ,

password : null 

})

}


return done ( null , user)

}

catch(err) {

return done(err, null);

}


}


)
    
)




module.exports = passPort
