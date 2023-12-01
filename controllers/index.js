const Myproduct = require('../models/myproducts');

// *To add a product

let addProduct = async (req, res, next) => {
    try {
        let myproduct = await Myproduct.create(req.body);
        res.status(201).json({ error: "false", message: "Product adding Done" })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ error: "true", message: err.errors.id.message })

    }
}



let getProduct = async (req, res, next) => {
    let { id } = req.params
    try {
        let myproduct = await Myproduct.findOne({id});
        if (!myproduct) {
           return res.status(404).json({ error: "true", message: `No Product Found  ${id}` })

        }
        res.status(200).json(myproduct)
    }
    catch (err) {
        res.status(500).json({ error: "true", message: `this product id is not found` })
    }
}

// * Pagination

let getProducts = async (req, res, next) => {
    try {
        let{page,pagesize,productName,category}=req.query
        
        let queryObject={}
        
        if(productName)
        {
            queryObject.productName=productName
        }
        if(category)
        {
            queryObject.category=category
        }
        let allproducts=Myproduct.find(queryObject)
        
        if(!page && !pagesize)
        {
            console.log("hello");
            allproducts=await allproducts
            return res.status(200).json({count:allproducts.length,error:false,
            message:"Products fetched ",data:allproducts})
        }
        let newPage=page || 1;
        let newpageSize=pagesize || 10;
        let newskip=(newPage-1)*newpageSize

        allproducts=await allproducts.skip(newskip).limit(newpageSize)
        res.status(200).json({count:allproducts.length,error:false,
        message:"Products fetched ",data:allproducts})

        let products = await allproducts
        res.status(200).json(products)
    }
    catch (err) {
        console.log(err)
    }
}

//  * updating products

let updateProduct = async (req, res, next) => {
    
    let { id } = req.params

    try {
    
        let updateProduct = await Myproduct.findOneAndUpdate({ _id: id }, { title: req.body.title },{new:true,runValidators:true});
        console.log(updateProduct)
        
        if (!updateProduct) {
            return res.status(400).json({ error: "true", message: `No product found ${id}` })

        }
        res.status(200).json({ error: "false", message: "product updation done", updatedTask })

    }

    catch (err) {
        // res.status(400).json({ error: "true", message: `product id is not found`,err })
        next(err)


    }
}


// * Deleting products

let deleteProduct = async (req, res, next) => {
    let { id } = req.params
    try {
        let deletedProduct = await Myproduct.findOneAndDelete({id});
        if (!deletedProduct) {
            return res.status(400).json({ error: "true", message: `No Product Found  ${id}` })
        }
        res.status(201).json({ error: "false", message: `Product ${deletedProduct.id} deleted done` })
    }
    catch (err) {
        console.log(err.message)
        res.status(400).json({ error: "true", message: `this product  id is not found` })
    }
}

module.exports = {
    addProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}