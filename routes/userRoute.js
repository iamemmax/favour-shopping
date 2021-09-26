const express = require("express")
const userSchema = require("../model/userSchema")
// import routes from controller
const {getRegister, newUser, getLogin, loginUser, logOut} = require("../controller/User")
const userRouter = express.Router()


// register routes
userRouter.get("/register", getRegister)
userRouter.post("/register", newUser)


//  login routes
userRouter.get("/login", getLogin)
userRouter.post("/login", loginUser)

// logout routes
userRouter.get("/logout", logOut)



module.exports =  userRouter;