const express = require('express');
const {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/index');
    
let router=express.Router();


router.post("/myproducts",addProduct);
router.get("/myproducts",getProducts);
router.get("/myproducts/:id",getProduct);
router.get("/myproducts/:id",updateProduct);
router.delete("/myproducts/:id",deleteProduct);

module.exports=router