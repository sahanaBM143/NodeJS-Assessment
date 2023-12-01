const mongoose = require('mongoose');

let myproductSchema=new mongoose.Schema({
    id:{
        type:String,
        required:{value:true,message:"id Required"}
    },
    myproductName:{
        type:String,
        required:{value:true,message:"Product Name Required"}
    },
    myproductCategory:{
        type:String,
        required:{value:true,message:"Product Category Required"}
    },
    imgUrl:{
        type:String,
        required:{value:true,message:"Image url Required"}
    },
    myproductDescription:{
        type:String,
        required:{value:true,message:"Product Description Required"}
    },})


module.exports=mongoose.model("Myproduct",myproductSchema)