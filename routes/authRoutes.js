



const express = require("express") 


const router = express.Router()


const validate = require("../middlewares/validate")


const { registerUser , loginUser } = require("../middlewares/joiSchema")


const { registerUsers , loginUsers , refershToken , logout} 

= require ("../controllers/authControllers")


const verifyToken = require("../middlewares/authMiddleware")

const jwt = require("jsonwebtoken")


const passPort = require("passport")


router.get("/google" , passPort.authenticate("google" , {


    scope : ["profile" ,"email"] ,

    session : false ,

    prompt : "select_account consent"

}))


router.get ("/google/callback" 
    
, passPort.authenticate("google" , {

  failureRedirect : `${process.env.CLIENT_URL}/login` ,

  session : false 
    
}),


async (req, res) => {
  try {
    // 1. إنشاء Access Token (مده قصيرة)
    const accessToken = jwt.sign(

      { userId: req.user._id },

      process.env.ACCESS_TOKEN,

      { expiresIn: '15m' }
    );

    // 2. إنشاء Refresh Token (مده طويلة)
    const refreshToken = jwt.sign(

      { userId: req.user._id },

      process.env.REFRESH_TOKEN,

      { expiresIn: '7d' }
    );

  req.user.refreshTokens = req.user.refreshTokens || [];

    req.user.refreshTokens.push(refreshToken);
    await req.user.save();

    // 4. إرسال الـ Refresh Token في HTTP-Only Cookie
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true, // يمنع JavaScript في الفرونت من قراءتها (أمان عالي)
      secure: process.env.NODE_ENV === 'production', // تشتغل بس مع HTTPS
      sameSite: 'none',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 أيام
    });

    // 5. تحويل للفرونت ومعاه الـ Access Token فقط في الرابط
    res.redirect(`${process.env.CLIENT_URL}/login?accessToken=${accessToken}`);
  } catch (err) {
    res.redirect(`${process.env.CLIENT_URL}/login`);
  }
}


)









router.post("/register" , validate(registerUser) , registerUsers )


router.post("/login" , validate(loginUser) , loginUsers)


router.post("/refreshToken" , refershToken) 

router.delete("/logout" , verifyToken , logout )



module.exports = router










