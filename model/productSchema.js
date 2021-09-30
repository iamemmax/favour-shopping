const mongoose = require("mongoose")
const slugify = require("slugify")
const domPurifier = require("dompurify")
const {JSDOM} = require("jsdom")
const htmlPurify = domPurifier(new JSDOM().window)
// const stripHtml = require('string-strip-html')



const productSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true,
        trim:true
    },
    price:{
        type:Number,
        required:true,
        trim:true
    },

    category:{
        type:String,
        required:true,
        trim:true
    },

    quantity:{type:String, default:"1"},
   
        productImg:[],
                

                size:{
                type:String,
                
                trim:true
            },
            color:{
                type:String,
                
                trim:true
            },
            totalQty:{
                type:String,
                
                trim:true
            },
                   
               
               
    description:{
        type:String,
        required:true,
        trim:true
    },

    slug:{
      required:true,
      type:String  
    },
    postedBy:{
        type:mongoose.Schema.Types.ObjectId,
         ref:"users"
     },

     snippet:{
        type:String
     },
     createdAt:{
         type:Date,
         default:Date.now
     }
})

productSchema.pre("validate", function(next){
    this.slug = slugify(this.productName, {
        lower:true,
        // strict:true
    })

    next()
})

productSchema.pre("validate", function(next){
    if(this.description){
        this.description = htmlPurify.sanitize(this.description)
        // this.snippet = stripHtml(this.description.subString(0, 200)).result
    }
    next()
})


module.exports = mongoose.model("products", productSchema)