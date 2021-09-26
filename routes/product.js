const express = require("express") 
let {getUpload, newProduct, singleProduct} = require("../controller/product")
const productRouter = express.Router()
const upload = require("../config/upload")



productRouter.get("/new", getUpload)
productRouter.post("/new", upload.array("productImg", 600), newProduct)
productRouter.get("/:slug", singleProduct)


module.exports = productRouter;