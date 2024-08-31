const mongoose = require('mongoose');



const cartproducts = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    // cartTotalPrice:{
    //     type:Number,
    //     required:true,
    //     default:0,
    // },
    cartItems:{
        type:[{productId:String,productName:String,productImage:String,productPrice:Number}],
        required:true,
        default:[],
    },
    // cartCount:{
    //     type:Number,
    //     required:true,
    //     default:0,
    // }
})




module.exports = mongoose.model('cartproducts', cartproducts)