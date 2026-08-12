



const express = require("express") 


const router = express.Router()


const validate = require("../middlewares/validate")


const { registerUser , loginUser } = require("../middlewares/joiSchema")


const { registerUsers , loginUsers , refershToken , logout} 

= require ("../controllers/authControllers")


const verifyToken = require("../middlewares/authMiddleware")


router.post("/register" , validate(registerUser) , registerUsers )


router.post("/login" , validate(loginUser) , loginUsers)


router.post("/refreshToken" , refershToken) 

router.delete("/logout" , verifyToken , logout )



module.exports = router










