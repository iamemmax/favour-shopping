const express = require("express")
const productSchema = require("../model/productSchema");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const multer = require("multer")
const stripHtml = require("striptags")

exports.getUpload = (req, res) => {
  res.render("./product/newProduct", {
    title: "Add new product",
  });
};

// upload product
exports.newProduct = async (req, res) => {
  let error = [];
  let productImgContainer = []
  let {productName, price, category, color, size, totalQty, description}  = req.body
  if(!productName || !price || !category|| !color || !size || !totalQty || !description){
    error.push({msg: "please fill all field"})
    
    if(!req.files){
      error.push({msg: "please choose a photo"})
    }
    
    console.log(stripHtml(description));
    
    
    if(req.files.length > 6){
      error.push({msg: "please choose at least minimum of 6 images"})
      res.render("./product/newProduct", {
        title: "Add new product",
          error
        });
        return
      }
      
    }
    
    
    
    
    if(error.length > 0){
      res.render("./product/newProduct", {
        title: "Add new product",
        error
      });
    }else{
      
      try {
        
      let productImgg = req.files
      for(let productPix of productImgg) {
        
        // const { filename: image } = req.files;

        await sharp(productPix.path)
        .resize(500, 500, {
          fit: sharp.fit.inside,
     })
     .jpeg({quality:90})
   
     .toFile(
      path.resolve(__dirname, ".","../public/img", "productImg", productPix.filename)
      )
      fs.unlinkSync(productPix.path);
      const dbFile ={
        filename : productPix.filename,
        size : productPix.size
      }
      
      productImgContainer.push(dbFile);
      
      
    }
  
    
    let postProduct = await new productSchema({
      productName, price, category, color, size, totalQty, description,
      productImg:productImgContainer,  postedBy:req.user._id
    })

    console.log(postProduct);
   
    let save =  await postProduct.save()
    if(!save){
      console.log(err);
    }else{
      
      res.send("succcess")
    }
      
  
} catch (error) {
  console.log(error);
  
}
    
  }
  console.log(productImgContainer);
}

// single product

exports.singleProduct = async (req, res) =>{
let product = await productSchema.find({slug:req.params.slug})

console.log(product[0].productImg[0].filename);
 
   
   res.render("singleProduct",{
     title:product.slug,
    // description:"we sell product like shoe, bags, wristwatch",
    // keyword:"buy product shoe bag wristwatch cloth t-shirt jean trousers",
    // user:req.user,
    product
     
    })
    
  




}