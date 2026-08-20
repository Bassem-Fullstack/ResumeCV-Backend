



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


router.get("/google/callback", (req, res, next) => {
  passPort.authenticate("google", { session: false }, async (err, user, info) => {
    // لو حصل خطأ في Passport أو Google مابعتتش مستخدم
    if (err || !user) {
      console.error("Google Auth Error:", err || info);
      return res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }

    try {
      // 1. إنشاء Access Token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN,
        { expiresIn: "15m" }
      );

      // 2. إنشاء Refresh Token
      const refreshToken = jwt.sign(
        { userId: user._id },
        process.env.REFRESH_TOKEN,
        { expiresIn: "7d" }
      );

      // 3. حفظ الـ Refresh Token في الداتابيز
      user.refreshTokens = user.refreshTokens || [];
      user.refreshTokens.push(refreshToken);
      await user.save();

      // 4. إرسال الكوكي (تأكيد sameSite و secure عشان تشتغل على Vercel و Localhost)
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,        // لازم true طالما الباك إند HTTPS على Vercel
        sameSite: "none",    // لازم none طالما الفرونت والباك مختلفين
        path: "/",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      // 5. التوجيه للداشبورد مباشرة مع الـ Access Token
      return res.redirect(`${process.env.CLIENT_URL}/dashboard?accessToken=${accessToken}`);
    } catch (error) {
      console.error("Callback Processing Error:", error);
      return res.redirect(`${process.env.CLIENT_URL}/login?error=server_error`);
    }
  })(req, res, next);
});








router.post("/register" , validate(registerUser) , registerUsers )


router.post("/login" , validate(loginUser) , loginUsers)


router.post("/refreshToken" , refershToken) 

router.delete("/logout" , verifyToken , logout )



module.exports = router










