const mongoose = require('mongoose');



const products = new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productCategory:{
        type:String,
        required:true,
    },
    productQuantity:{
        type:String,
        required:true,
    },    
    productPrice:{
        type:Number,
        required:true,
    },    
    productImage:{
        type:String,
        required:true,
    },
})




module.exports = mongoose.model('products', products)