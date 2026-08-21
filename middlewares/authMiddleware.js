const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const User = require("../models/User")

const verifyToken = asyncHandler(async (req, res, next) => {

  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json("No token provided")
  }

  const token = authHeader.replace("Bearer ", "")

  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN)

    const getUser = await User.findById(decode.userID).select("-password -refreshTokens")

    if (!user) {
      return res.status(401).json({ message: "User not found" })
    }

    req.user = getUser

    next()
  }
  catch (err) {
    return res.status(401).json({ message: "token is invalid" })
  }
})

module.exports = verifyToken