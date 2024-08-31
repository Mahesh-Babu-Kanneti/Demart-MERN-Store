const mongoose = require('mongoose');



const payments = new mongoose.Schema({
    orderId:{
        type:String,
        required:true,
    },
    paymentId:{
        type:String,
        required:true,
    },
    orderAmount:{
        type:Number,
        required:true,
    },    
    userId:{
        type:String,
        required:true,
    },
    transKey:{
        type:String,
        required:true,
    }
})




module.exports = mongoose.model('Orders', payments)