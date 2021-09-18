const express = require("express")
const path = require("path")
const cors = require("cors")
const color = require("colors")
require("dotenv").config()
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const userRouter = require("./routes/authenticate/userRoute")
const userSchema = require("./model/userSchema")

const app = express()


// middle wares
app.use(cors())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(session({
    secret:"emmalex",
    cookie:{maxAge: 600000000000000},
    resave:true,
    saveUninitialized:true
}))

app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport)

    


// Homepage routes
app.get("/", (req, res) =>{
    res.render("index", {
        title:"Homepage",
        description:"we sell product like shoe, bags, wristwatch",
        keyword:"buy product shoe bag wristwatch cloth t-shirt jean trousers",
        user:req.user
    })
})

// connect to databse
mongoose.connect(process.env.db_connect, {
    useNewUrlParser: true, useUnifiedTopology: true 
}, (err, connet)=>{
    if(err) console.log(err);
    else console.log("database connected successfully".blue)
})

// Routes
app.use("/user", userRouter)

// listen to Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server started on http://localhost:${PORT}`.red);
})