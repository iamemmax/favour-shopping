const express = require("express")
const path = require("path")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const session = require("express-session")
const passport = require("passport")
const LocalStrategy = require('passport-local').Strategy;
const userRouter = require("./routes/userRoute")
const productRouter = require("./routes/product")
const productSchema = require("./model/productSchema")
const compression = require("compression")

const app = express()


// middle wares
app.use(cors())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(compression())

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
app.get("/", async (req, res) =>{

    let products =  await productSchema.find()
   
    
    res.render("index", {
        title:"Homepage",
        description:"we sell product like shoe, bags, wristwatch",
        keyword:"buy product shoe bag wristwatch cloth t-shirt jean trousers",
        user:req.user,
        products
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
app.use("/user", userRouter);
app.use("/product", productRouter);

// listen to Port
const PORT = process.env.PORT || 3000
app.listen(PORT, () =>{
    console.log(`server started on http://localhost:${PORT}`);
})