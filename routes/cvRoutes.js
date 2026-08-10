



const express = require("express")


const router = express.Router()



const { generateCV , createCVManual , getAllCV , getSingleCV , updateCV ,  deleteCV }
  
 = require("../controllers/cvController")


 const verifyToken = require("../middlewares/authMiddleware")




router.post("/generate" , verifyToken , generateCV )


router.post("/manual" , verifyToken , createCVManual)


router.get("/" , verifyToken , getAllCV)


router.get("/:id" , verifyToken , getSingleCV)


router.patch("/update/:id" , verifyToken , updateCV)


router.delete("/delete/:id" , verifyToken , deleteCV)



module.exports = router